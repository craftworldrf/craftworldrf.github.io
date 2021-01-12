
function clwb_movemap_update_step(buf) {
	return { step: buf.readUInt32LE(0) }
}
clwb_movemap_update_step.ID = 67

function clwb_uiscreen_update_isshow(buf) {
	return { isShow: buf.readUInt32LE(0) }
}
clwb_uiscreen_update_isshow.ID = 68

function clwb_svcl_packet(packet) {
	return { packet }
}
clwb_svcl_packet.ID = 51

function wbcl_clsv_packet(obj) {
	return obj.packet
}
wbcl_clsv_packet.ID = 52

function wbcl_rect_list_clear() {}
wbcl_rect_list_clear.ID = 1

function clwb_ui_show() {}
clwb_ui_show.ID = 4

function clwb_ui_hide() {}
clwb_ui_hide.ID = 5

function clwb_cguiscreen_draw() {}
clwb_cguiscreen_draw.ID = 91

function clwb_wm_message(buf) {
	const msg = buf
	let i = -4
	const uMsg   = msg.readInt32LE(i+=4)
	const wParam = msg.readInt32LE(i+=4)
	const lParam = msg.readInt32LE(i+=4)

	const rfWinRect = {
		x     : msg.readInt32LE(i+=4),
		y     : msg.readInt32LE(i+=4),
		width : msg.readInt32LE(i+=4),
		height: msg.readInt32LE(i+=4),
	}
	const elWinRect = {
		x     : msg.readInt32LE(i+=4),
		y     : msg.readInt32LE(i+=4),
		width : msg.readInt32LE(i+=4),
		height: msg.readInt32LE(i+=4),
	}
	const utfChar = msg.readInt32LE(i+=4)
	return { uMsg, wParam, lParam, rfWinRect, elWinRect, utfChar }
}
clwb_wm_message.ID = 1101;

function wbcl_keyboard_input_lock(fl) {
	return Buffer.from([fl ? 1 : 0, 0, 0, 0])
}
wbcl_keyboard_input_lock.ID = 95

function wbcl_init(obj) {
	const b = Buffer.alloc(256)
	b.fill(0)
	b.writeInt32LE(obj.hwnd, 0)
	obj.sharedMemoryName
		.split('')
		.map((c, i) => b[i+4] = c.charCodeAt())

	return b
}
wbcl_init.ID = 41

module.exports = {
	clwb_movemap_update_step,
	clwb_uiscreen_update_isshow,
	clwb_svcl_packet,
	wbcl_clsv_packet,
	wbcl_rect_list_clear,
	clwb_ui_show,
	clwb_ui_hide,
	clwb_cguiscreen_draw,
	clwb_wm_message,
	wbcl_keyboard_input_lock,
	wbcl_init,
}