
const { app, BrowserWindow, ipcMain, screen } = require('electron')

const path = require('path')
const fs = require('fs')
const { performance } = require('perf_hooks')

const Log = new (require('./log.js'))('./rfex/log/electron.log')
const WndProc = require('./wndProc.js')
const SharedMemoryBitmap = require('./sharedMemoryBitmap.js')

//////////////////////////////////////
globalThis.Log = Log
//////////////////////////////////////

app.commandLine.appendSwitch('disable-pinch')
app.commandLine.appendSwitch('high-dpi-support', 1)
app.commandLine.appendSwitch('force-device-scale-factor', 1)
app.disableHardwareAcceleration()
//////////////////////////////////////
const WIN_TITLE = "APP_GO89IKFODKR49N1W3E3K34XDOP";

let MODE_DEV = 0
let MODE_DEV_TOOLS = 0

//MODE_DEV = MODE_DEV_TOOLS = 1
//MODE_DEV = 1
/////////////////////////////////////

const SV_UDP_PORT   = ~~(process.argv[2] || 37695);
const SV_TCP_PORT   = ~~(process.argv[3] || 37694);
const SCREEN_X_SIZE = ~~(process.argv[4] || 800  );
const SCREEN_Y_SIZE = ~~(process.argv[5] || 600  );

/////////////////////////////////////
function createWindow(sharedMemoryName, sharedMemoryBitmap) {
	const offscreenOptions = {
		width         : SCREEN_X_SIZE,
		height        : SCREEN_Y_SIZE,
		frame         : !!MODE_DEV,
		show          : false,
		transparent   : true,
		skipTaskbar   : true,
		enableLargerThanScreen: false,
		
		alwaysOnTop   : false,
		minimizable   : false,
		maximizable   : false,

		webPreferences: {
			nodeIntegration: true,
			offscreen      : true
		}
	}
	const layeredOptions = {
		width         : SCREEN_X_SIZE,
		height        : SCREEN_Y_SIZE,
		frame         : !!MODE_DEV,
		show          : true,
		transparent   : true,
		skipTaskbar   : true,
		enableLargerThanScreen: false,
		
		alwaysOnTop   : true,
		minimizable   : false,
		maximizable   : false,

		webPreferences: {
			nodeIntegration: true,
			offscreen      : false
		}
	}

	const win = new BrowserWindow( offscreenOptions )

	win.loadFile(`public/index.html`)

	win.webContents.setZoomLevel(0)
	win.webContents.setZoomFactor(1)
	win.webContents.setVisualZoomLevelLimits(1, 1)
	win.setSize(SCREEN_X_SIZE, SCREEN_Y_SIZE)
	
	//win.setSize(400,400)

	if ( MODE_DEV && MODE_DEV_TOOLS )
		win.webContents.openDevTools()
	
	//if ( MODE_DEV )
	//	win.showInactive()

	let firstPaint = true
	win.webContents.on('paint', (event, dirty, image) => {
		win.webContents.send("paint")
		
		if ( firstPaint ) {
			firstPaint = false
			
			const size = image.getSize()	
			const [w, h] = win.getSize()

			Log.notice('[Fisrt paint] Bitmap size: ' + size.width + 'x' + size.height + ' Win size: ' + w + 'x' + h)
		}
		
		const st = performance.now()
		
		const buffer = image.getBitmap()
		const size = image.getSize()

		if ( !sharedMemoryBitmap.write(buffer, size.width, size.height, dirty) )
			appClose()
		
		const et = performance.now()
		//Log.notice("Delta: " + (et-st).toFixed(3) + " - " +dirty.width+"x"+dirty.height)
	})

	ipcMain.on("request-init-options", event => event.returnValue = {
		udpPort: SV_UDP_PORT,
		tcpPort: SV_TCP_PORT,
		hwnd   : win.getNativeWindowHandle().readInt32LE(0),
		sharedMemoryName,
	})

	const wndProc = new WndProc(win)
	ipcMain.on("wm_message", (event, msg) => wndProc.proc(msg))
	
	return win
}

function appStart() {
	Log.notice("")
	Log.notice(`APP::Start (${SCREEN_X_SIZE}x${SCREEN_Y_SIZE})`)

	const sharedMemoryBitmap = new SharedMemoryBitmap(SCREEN_X_SIZE, SCREEN_Y_SIZE, 128)
	if ( !sharedMemoryBitmap.create() )
		return appClose()
	
	app.on("ready", () => {
		ipcMain.on("proxy-log", (event, name, ...args) => event.returnValue = Log[name](...args))

		const win = createWindow(sharedMemoryBitmap.sharedMemoryName, sharedMemoryBitmap)
		ipcMain.on("app-show", (event, data) => {
			Log.notice("win.show")
		//	win.show();
		})
		ipcMain.on("app-hide", (event, data) => {
			Log.notice("win.hide")
		//	win.hide();
		})
		ipcMain.on("app-close", (event, data) => {
			Log.notice("win.close")
			appClose();
		})
	})
	app.on('window-all-closed', function () {
		appClose();
	})
}
function appClose() {
	Log.notice("APP::Close")
	Log.flush()
	Log.close()
	app.quit()
}

appStart()
