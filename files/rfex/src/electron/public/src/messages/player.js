
function svcl_player_load(buf) {
	return {
		dwAccountSerial: buf.readUInt32LE(0),
		dwPlayerSerial : buf.readUInt32LE(4),
	}
}
svcl_player_load.ID = 1

function svcl_player_unload() {}
svcl_player_unload.ID = 2

module.exports = {
	svcl_player_load,
	svcl_player_unload
}