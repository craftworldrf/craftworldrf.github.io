
function svcl_inventory_init() {}
svcl_inventory_init.ID = 20

function svcl_inventory_complete() {}
svcl_inventory_complete.ID = 21

function svcl_inventory_clear() {}
svcl_inventory_clear.ID = 3

function svcl_inventory_set_num_slots(buf) {
	return { 
		numSlots: buf.readUInt32LE(0)
	}
}
svcl_inventory_set_num_slots.ID = 6

function svcl_inventory_set_item(buf) {
	const id = buf.slice(0, 8).toString("hex");
	const amount = buf.readUInt32LE(8);
	const m_byTableCode = buf[16];
	const m_wItemIndex = buf.readUInt16LE(17);
	
	const itemTableCodeCL = IEPT_SERVER_TO_CLIENT[m_byTableCode];
	const itemIndexCL = m_wItemIndex;
	return {
		id, amount,
		
		itemTableCodeCL, itemIndexCL,
		
		itemTableCode: m_byTableCode, 
		itemIndex: m_wItemIndex,
		m_byTableCode,
		m_wItemIndex,
	};
}
svcl_inventory_set_item.ID = 4

function svcl_inventory_update_item_amount(buf) {
	const id = buf.slice(0, 8).toString("hex");
	const amount = buf.readUInt32LE(8);
	
	return {
		id, amount,
	};
} 
svcl_inventory_update_item_amount.ID = 5

function svcl_inventory_move_item_to_native_result() {}
svcl_inventory_move_item_to_native_result.ID = 12

///////////////////////////////
function clsv_inventory_support() {}
clsv_inventory_support.ID = 19

function clsv_inventory_move_item_to_native_request({id, amount}) {
	const msg = Buffer.from("00".repeat(8) + `${id}` + "00".repeat(8), "hex")
	msg.writeUInt32LE(amount, 16)
	return msg
}
clsv_inventory_move_item_to_native_request.ID = 11

module.exports = {
	svcl_inventory_init,
	svcl_inventory_complete,
	svcl_inventory_clear,
	svcl_inventory_set_num_slots,
	svcl_inventory_set_item,
	svcl_inventory_update_item_amount,
	svcl_inventory_move_item_to_native_result,
	
	clsv_inventory_support,
	clsv_inventory_move_item_to_native_request,
}
