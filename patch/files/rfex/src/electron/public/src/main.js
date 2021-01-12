const fs = require('fs')
const { EventEmitter } = require('events')

/////////////////////////
const Log = require("./src/log.js")
globalThis.Log = Log
process.on('uncaughtException', err => Log.error("Error: " + err.message) )

/////////////////////////
const g_MainEventsBus = new EventEmitter()
globalThis.g_MainEventsBus = g_MainEventsBus
/////////////////////////

const { ipcRenderer } = require('electron')

const {
	IEPT_SERVER_TO_CLIENT,
	IEPT_CLIENT_TO_SERVER,
	IsOverLapItem ,
} = require('./src/rfo/index.js')
const MultiBoolState = require('./src/helpers/multi-bool-state.js')
const RectMng = require('./src/helpers/rect-mng.js')

const UDPClient = require('./src/net/udp-client.js')
const TCPClient = require('./src/net/tcp-client.js')
const MessagesMng = require('./src/net/messages-mng.js')

const IPCMessages       = require('./src/ipc-messages/index.js')
const PlayerMessages    = require('./src/messages/player.js')
const InventoryMessages = require('./src/messages/inventory.js')
const SystemMessages    = require('./src/messages/system.js')

/////////////////////////
const g_InitOptions = ipcRenderer.sendSync("request-init-options")
Log.notice('g_InitOptions: ' + JSON.stringify( g_InitOptions ))

/////////////////////////
const g_UDPClient = UDPClient.connect("127.0.0.1", g_InitOptions.udpPort)
const g_TCPClient = TCPClient.connect("127.0.0.1", g_InitOptions.tcpPort)
const g_RectMng   = new RectMng(g_UDPClient)

/////////////////////////
const g_IPCMessagesMng = new MessagesMng()
g_IPCMessagesMng.$addModels({
	...IPCMessages,
})
const g_MessagesMng = new MessagesMng()
g_MessagesMng.$addModels({
	...SystemMessages,
	...PlayerMessages,
	...InventoryMessages,
})

/////////////////////////
const g_MultiBoolState = new MultiBoolState(5)
g_MultiBoolState.set("playerLoad"       , false)
g_MultiBoolState.set("inventoryShow"    , false)
g_MultiBoolState.set("notMovemapProcess", false)
g_MultiBoolState.set("uiScreenIsShow"   , false)
g_MultiBoolState.set("uiShow"           , true )

const uiShow = fl => {
	//Log.notice('uiShow = ' + fl)
	globalThis.document.body.style.display = fl ? 'block' : 'none'
}
g_MultiBoolState.on('update', uiShow)
uiShow(false)
//uiShow(1)

/**
const __set = g_MultiBoolState.set.bind(g_MultiBoolState)
g_MultiBoolState.set = (k, v) => {
	Log.notice('g_MultiBoolState.set ' + k + ' -> ' + v)
	__set(k, v)
}
*/

function ShowFps() {
	let ticks = []
	const getFPS = () => {
		ticks = ticks.slice(-60)
		return ( (ticks.length - 1) / ( ticks[ticks.length-1] - ticks[0] ) * 1e3 ).toFixed(2)
	}
	const tick = () => {
		ticks.push(Date.now())
		if ( ticks.length > 120 )
			ticks = ticks.slice(-60)
	}
	return {tick, getFPS}
}

let RFFps = ShowFps()
let ELFps = ShowFps()

/**
setInterval(() => {
	Log.notice('fps: ' + RFFps.getFPS() + ' ' + ELFps.getFPS())
	try {
//		globalThis.showList[0] = RFFps.getFPS()
//		globalThis.showList[1] = ELFps.getFPS()
	} catch {}
}, 1e3)
*/


/////////////////////////
function main() {
	//ipcRenderer.on('paint', ELFps.tick)

	//////////////////////////
	g_IPCMessagesMng.$subscribe({
		clwb_movemap_update_step   : ({step  }) => g_MultiBoolState.set("notMovemapProcess", !step   ),
		clwb_uiscreen_update_isshow: ({isShow}) => g_MultiBoolState.set("uiScreenIsShow"   , !!isShow),
		clwb_svcl_packet           : ({packet}) => g_MessagesMng.$write(packet),
		clwb_ui_show               : (        ) => g_MultiBoolState.set("uiShow", true ),
		clwb_ui_hide               : (        ) => g_MultiBoolState.set("uiShow", false),

		clwb_wm_message            : (msg) => ipcRenderer.send("wm_message", msg),
		
		clwb_cguiscreen_draw       : () => g_MainEventsBus.emit('cguiscreen_draw')
	})
	g_MainEventsBus.on('input-focus', fl => {
		Log.notice('input-focus: ' + fl)
		g_IPCMessagesMng.wbcl_keyboard_input_lock(fl)
	})
	
	let player = null
	g_MessagesMng.$subscribe({
		svcl_player_load(msg) {
			Log.notice("svcl_player_load [dwAccountSerial: "+ msg.dwAccountSerial + " dwPlayerSerial: " + msg.dwPlayerSerial+"]")
			player = msg
			
			g_MessagesMng.clsv_rfex_support()
			g_MessagesMng.clsv_inventory_support()

			g_MultiBoolState.set("playerLoad"       , true )
			g_MultiBoolState.set("inventoryShow"    , false)
			g_MultiBoolState.set("notMovemapProcess", true )
			g_MultiBoolState.set("uiScreenIsShow"   , true )
			
			ipcRenderer.send("app-show")
		},
		svcl_player_unload() {
			Log.notice("svcl_player_unload")
			player = null
			
			g_MultiBoolState.set("playerLoad"       , false)
			g_MultiBoolState.set("inventoryShow"    , false)
			g_MultiBoolState.set("notMovemapProcess", false)
			g_MultiBoolState.set("uiScreenIsShow"   , false)
		},
	})

	let items
	g_MessagesMng.$subscribe({
		svcl_inventory_init() {
			Log.notice("svcl_inventory_init")
			g_Inventory.setID( "_default_" )
			g_Inventory.clear()
			items = []
		},
		svcl_inventory_complete() {
			Log.notice("svcl_inventory_complete")
			
			if ( !player )
				return

			g_Inventory.clear()
			g_Inventory.setID( String(player.dwPlayerSerial) )
			g_Inventory.setItemList(items)
			items = null
		
			g_MultiBoolState.set("inventoryShow", true)
		},
		svcl_inventory_clear() {
			Log.notice("svcl_inventory_clear")
			g_Inventory.clear()
		},
		svcl_inventory_set_num_slots({ numSlots }) {
			Log.notice("svcl_inventory_set_num_slots: " + numSlots)
			g_Inventory.setNumSlots(numSlots)
		},
		svcl_inventory_set_item(msg) {
			if ( items ) {
				Log.notice(`svcl_inventory_set_item: #${msg.id} ${ msg.itemTableCode }:${ msg.itemIndex } (${msg.amount})`)
				items.push(msg)
			} else {			
				g_Inventory.setItem(msg)
			}
		},
		svcl_inventory_update_item_amount(msg) {
			g_Inventory.updateItem(msg)
		}
	})
	
	globalThis.g_Inventory.onuse = ({id, amount, itemTableCodeCL}) => {
		//Log.notice(`CLSV_MOVE_INVENTORY_ITEM_TO_NATIVE_REQUEST: ${id} (${amount})`)
		if ( !IsOverLapItem(IEPT_CLIENT_TO_SERVER[itemTableCodeCL]) )
			amount = 1

		amount = Math.max(1, Math.min(amount, 99))
		g_MessagesMng.clsv_inventory_move_item_to_native_request({ id, amount })
	}
	
	
	g_MessagesMng.$onwrite = packet => {
		packet = Buffer.concat([
			Buffer.from([0xFF,0xFF,0xFF,0xFF]),
			packet,
		])
		g_IPCMessagesMng.wbcl_clsv_packet({packet})
	}
	
	g_UDPClient.on("message", packet => g_IPCMessagesMng.$write(packet))
	g_IPCMessagesMng.$onwrite = packet => g_UDPClient.sendPacket(packet)
	
	//////////////////////////
	g_IPCMessagesMng.wbcl_init(g_InitOptions)
	g_IPCMessagesMng.wbcl_rect_list_clear()
}

function appStart() {
	g_TCPClient
		.on('connect', () => Log.notice('TCPClient connect'))
		.on('close', () => {
			Log.notice('TCPClient close')
			appClose()
		})
		.on('error', e => Log.error('TCPClient error: ' + e.message))
}
function appClose() {
	ipcRenderer.send('app-close')
}
appStart()

/**
	g_Inventory - global object
	g_Inventory -> main/g_RectMng -> g_Inventory
*/
globalThis.main = main
globalThis.g_RectMng = g_RectMng
globalThis.fs = fs

Log.notice('End file src/main.js')
Log.flush()
