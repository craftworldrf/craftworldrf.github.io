
//////////////////////////
const MK_CONTROL  = 0x0008
const MK_LBUTTON  = 0x0001
const MK_MBUTTON  = 0x0010
const MK_RBUTTON  = 0x0002
const MK_SHIFT    = 0x0004
const MK_XBUTTON1 = 0x0020
const MK_XBUTTON2 = 0x0040

//////////////////////////
const WM_MOUSEMOVE   = 0x0200

const WM_LBUTTONDOWN = 0x0201
const WM_LBUTTONUP   = 0x0202

const WM_RBUTTONDOWN = 0x0204
const WM_RBUTTONUP   = 0x0205

const WM_MBUTTONDOWN = 0x0207
const WM_MBUTTONUP   = 0x0208

const WM_MOUSEWHEEL  = 0x020A

//////////////////////////
const WM_KEYDOWN     = 0x0100
const WM_KEYUP       = 0x0101
const WM_CHAR        = 0x0102
const WM_UNICHAR     = 0x0109

//////////////////////////

const VK_LBUTTON = 0x01
const VK_RBUTTON = 0x02
const VK_CANCEL = 0x03
const VK_MBUTTON = 0x04
const VK_XBUTTON1 = 0x05
const VK_XBUTTON2 = 0x06
const VK_BACK = 0x08
const VK_TAB = 0x09
const VK_CLEAR = 0x0C
const VK_RETURN = 0x0D
const VK_SHIFT = 0x10
const VK_CONTROL = 0x11
const VK_MENU = 0x12
const VK_PAUSE = 0x13
const VK_CAPITAL = 0x14
const VK_KANA = 0x15
const VK_HANGEUL = 0x15
const VK_HANGUL = 0x15
const VK_JUNJA = 0x17
const VK_FINAL = 0x18
const VK_HANJA = 0x19
const VK_KANJI = 0x19
const VK_ESCAPE = 0x1B
const VK_CONVERT = 0x1C
const VK_NONCONVERT = 0x1D
const VK_ACCEPT = 0x1E
const VK_MODECHANGE = 0x1F
const VK_SPACE = 0x20
const VK_PRIOR = 0x21
const VK_NEXT = 0x22
const VK_END = 0x23
const VK_HOME = 0x24
const VK_LEFT = 0x25
const VK_UP = 0x26
const VK_RIGHT = 0x27
const VK_DOWN = 0x28
const VK_SELECT = 0x29
const VK_PRINT = 0x2A
const VK_EXECUTE = 0x2B
const VK_SNAPSHOT = 0x2C
const VK_INSERT = 0x2D
const VK_DELETE = 0x2E
const VK_HELP = 0x2F

const VK_LWIN = 0x5B
const VK_RWIN = 0x5C
const VK_APPS = 0x5D
const VK_SLEEP = 0x5F
const VK_NUMPAD0 = 0x60
const VK_NUMPAD1 = 0x61
const VK_NUMPAD2 = 0x62
const VK_NUMPAD3 = 0x63
const VK_NUMPAD4 = 0x64
const VK_NUMPAD5 = 0x65
const VK_NUMPAD6 = 0x66
const VK_NUMPAD7 = 0x67
const VK_NUMPAD8 = 0x68
const VK_NUMPAD9 = 0x69
const VK_MULTIPLY = 0x6A
const VK_ADD = 0x6B
const VK_SEPARATOR = 0x6C
const VK_SUBTRACT = 0x6D
const VK_DECIMAL = 0x6E
const VK_DIVIDE = 0x6F
const VK_F1 = 0x70
const VK_F2 = 0x71
const VK_F3 = 0x72
const VK_F4 = 0x73
const VK_F5 = 0x74
const VK_F6 = 0x75
const VK_F7 = 0x76
const VK_F8 = 0x77
const VK_F9 = 0x78
const VK_F10 = 0x79
const VK_F11 = 0x7A
const VK_F12 = 0x7B
const VK_F13 = 0x7C
const VK_F14 = 0x7D
const VK_F15 = 0x7E
const VK_F16 = 0x7F
const VK_F17 = 0x80
const VK_F18 = 0x81
const VK_F19 = 0x82
const VK_F20 = 0x83
const VK_F21 = 0x84
const VK_F22 = 0x85
const VK_F23 = 0x86
const VK_F24 = 0x87
const VK_NUMLOCK = 0x90
const VK_SCROLL = 0x91
const VK_OEM_NEC_EQUAL = 0x92
const VK_OEM_FJ_JISHO = 0x92
const VK_OEM_FJ_MASSHOU = 0x93
const VK_OEM_FJ_TOUROKU = 0x94
const VK_OEM_FJ_LOYA = 0x95
const VK_OEM_FJ_ROYA = 0x96
const VK_LSHIFT = 0xA0
const VK_RSHIFT = 0xA1
const VK_LCONTROL = 0xA2
const VK_RCONTROL = 0xA3
const VK_LMENU = 0xA4
const VK_RMENU = 0xA5
const VK_BROWSER_BACK = 0xA6
const VK_BROWSER_FORWARD = 0xA7
const VK_BROWSER_REFRESH = 0xA8
const VK_BROWSER_STOP = 0xA9
const VK_BROWSER_SEARCH = 0xAA
const VK_BROWSER_FAVORITES = 0xAB
const VK_BROWSER_HOME = 0xAC
const VK_VOLUME_MUTE = 0xAD
const VK_VOLUME_DOWN = 0xAE
const VK_VOLUME_UP = 0xAF
const VK_MEDIA_NEXT_TRACK = 0xB0
const VK_MEDIA_PREV_TRACK = 0xB1
const VK_MEDIA_STOP = 0xB2
const VK_MEDIA_PLAY_PAUSE = 0xB3
const VK_LAUNCH_MAIL = 0xB4
const VK_LAUNCH_MEDIA_SELECT = 0xB5
const VK_LAUNCH_APP1 = 0xB6
const VK_LAUNCH_APP2 = 0xB7
const VK_OEM_1 = 0xBA
const VK_OEM_PLUS = 0xBB
const VK_OEM_COMMA = 0xBC
const VK_OEM_MINUS = 0xBD
const VK_OEM_PERIOD = 0xBE
const VK_OEM_2 = 0xBF
const VK_OEM_3 = 0xC0
const VK_OEM_4 = 0xDB
const VK_OEM_5 = 0xDC
const VK_OEM_6 = 0xDD
const VK_OEM_7 = 0xDE
const VK_OEM_8 = 0xDF
const VK_OEM_AX = 0xE1
const VK_OEM_102 = 0xE2
const VK_ICO_HELP = 0xE3
const VK_ICO_00 = 0xE4
const VK_PROCESSKEY = 0xE5
const VK_ICO_CLEAR = 0xE6
const VK_PACKET = 0xE7
const VK_OEM_RESET = 0xE9
const VK_OEM_JUMP = 0xEA
const VK_OEM_PA1 = 0xEB
const VK_OEM_PA2 = 0xEC
const VK_OEM_PA3 = 0xED
const VK_OEM_WSCTRL = 0xEE
const VK_OEM_CUSEL = 0xEF
const VK_OEM_ATTN = 0xF0
const VK_OEM_FINISH = 0xF1
const VK_OEM_COPY = 0xF2
const VK_OEM_AUTO = 0xF3
const VK_OEM_ENLW = 0xF4
const VK_OEM_BACKTAB = 0xF5
const VK_ATTN = 0xF6
const VK_CRSEL = 0xF7
const VK_EXSEL = 0xF8
const VK_EREOF = 0xF9
const VK_PLAY = 0xFA
const VK_ZOOM = 0xFB
const VK_NONAME = 0xFC
const VK_PA1 = 0xFD
const VK_OEM_CLEAR = 0xFE



class WndProc {
	constructor(win, fixedPos = false) {
		this.win = win

		const handlers = this.handlers = []
		const getPos = (msg, isGlobal = false) => {
			let x = ( (msg.lParam & 0xFFFF) << 16 ) >> 16
			let y = msg.lParam >> 16
			if ( isGlobal ) {
				x -= msg.rfWinRect.x
				y -= msg.rfWinRect.y
			}
			const globalX = msg.rfWinRect.x + x
			const globalY = msg.rfWinRect.y + y
			if ( fixedPos ) {
				x = globalX - msg.elWinRect.x
				y = globalY - msg.elWinRect.y
			}
			return { x, y, globalX, globalY }
		}
		const getModifiers = msg => {
			const modifiers = []
			if ( msg.wParam & MK_CONTROL ) modifiers.push('ctrl' )
			if ( msg.wParam & MK_SHIFT   ) modifiers.push('shift')
			return { modifiers }
		}
		const map = [
			[WM_LBUTTONDOWN, 'mouseDown', 'left'  , 1],
			[WM_LBUTTONUP  , 'mouseUp'  , 'left'  , 1],
			[WM_RBUTTONDOWN, 'mouseDown', 'right' , 1],
			[WM_RBUTTONUP  , 'mouseUp'  , 'right' , 1],
			[WM_MBUTTONDOWN, 'mouseDown', 'middle', 1],
			[WM_MBUTTONUP  , 'mouseUp'  , 'middle', 1],
			
			[WM_MOUSEMOVE  , 'mouseMove', undefined      , undefined],
			
		]
		map.map(([uMsg, type, button, clickCount]) => {
			handlers[uMsg] = msg => {
				const me = {
					type,
					button,
					clickCount,
					...getPos(msg),
					...getModifiers(msg),
				}
				//Log.notice( JSON.stringify(me,1,1) )
				win.webContents.sendInputEvent(me)	
			}
		})

		handlers[WM_MOUSEWHEEL ] = msg => {
			const delta = msg.wParam >> 16

			const deltaX = 0
			const deltaY = (delta / 120) * 100
			const me = {
				type: 'mouseWheel',
				deltaX,
				deltaY,
				...getPos(msg, true),
				...getModifiers(msg),
			}
			//Log.notice( JSON.stringify(me,1,1) )
			win.webContents.sendInputEvent(me)	
		}
		
		const keyboardMap = {
			[VK_CONTROL]: 'Ctrl',
			[VK_SHIFT  ]: 'Shift',
			[VK_MENU   ]: 'Alt',
			
			
			...Object.fromEntries(
				Array(24)
					.fill()
					.map((_, i) => [VK_F1 + i, 'F' + (i+1)])
			),
			
			//[VK_ADD    ]: 'Plus',
			[VK_SPACE  ]: 'Space',
			[VK_TAB    ]: 'Tab',
			[VK_CAPITAL]: 'Capslock',
			[VK_NUMLOCK]: 'Numlock',
			[VK_SCROLL ]: 'Scrolllock',
			[VK_BACK   ]: 'Backspace',
			[VK_DELETE ]: 'Delete',
			[VK_INSERT ]: 'Insert',
			[VK_RETURN ]: 'Enter',
			[VK_UP     ]: 'Up',
			[VK_DOWN   ]: 'Down',
			[VK_LEFT   ]: 'Left',
			[VK_RIGHT  ]: 'Right',
			[VK_HOME   ]: 'Home',
			[VK_END    ]: 'End',
			[VK_PRIOR  ]: 'PageUp',
			[VK_NEXT   ]: 'PageDown',
			[VK_ESCAPE ]: 'Escape',
			[VK_VOLUME_UP]: 'VolumeUp',
			[VK_VOLUME_DOWN]: 'VolumeDown',
			[VK_VOLUME_MUTE]: 'VolumeMute',
			[VK_MEDIA_NEXT_TRACK]: 'MediaNextTrack',
			[VK_MEDIA_PREV_TRACK]: 'MediaPreviousTrack',
			[VK_MEDIA_STOP]: 'MediaStop',
			[VK_MEDIA_PLAY_PAUSE]: 'MediaPlayPause',

			...Object.fromEntries(
				Array(10)
					.fill()
					.map((_, i) => [VK_NUMPAD0 + i, 'num' + i])
			),
			
			[VK_DECIMAL ]: 'numdec',
			[VK_ADD     ]: 'numadd',
			[VK_SUBTRACT]: 'numsub',
			[VK_MULTIPLY]: 'nummult',
			[VK_DIVIDE  ]: 'numdiv',
		}
		handlers[WM_KEYDOWN] = msg => {
			const keyCode = keyboardMap[ msg.wParam ] || String.fromCharCode(msg.utfChar)
			const me = {
				type   : 'keyDown',
				keyCode
			}
			//Log.notice( JSON.stringify(me,1,1) )
			win.webContents.sendInputEvent(me)
		}
		handlers[WM_KEYUP] = msg => {
			const keyCode = keyboardMap[ msg.wParam ] || String.fromCharCode(msg.utfChar)
			const me = {
				type   : 'keyUp',
				keyCode
			}
			//Log.notice( JSON.stringify(me,1,1) )
			win.webContents.sendInputEvent(me)
		}
		handlers[WM_CHAR] = msg => {
			const me = {
				type   : 'char',
				keyCode: String.fromCharCode(msg.utfChar)
			}
			//Log.notice( JSON.stringify(me,1,1) )
			win.webContents.sendInputEvent(me)
		}

	}
	proc(msg) {
		//Log.notice('wm_message: ' + JSON.stringify(msg, 1, 1) )
		this.handlers[msg.uMsg]?.(msg)
	}
}

module.exports = WndProc