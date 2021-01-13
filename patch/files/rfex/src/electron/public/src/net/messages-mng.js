class MessagesMng {
	$addModels(msgs) {
		this.$models = this.$models || {}
		Object
			.entries(msgs)
			.map(([k, v]) => {
				const { ID } = v
				this[k] = (obj) => {
					const packet = v(obj)
					const tmp = Buffer.alloc(2)
					tmp.writeUInt16LE(ID)
					this.$onwrite( Buffer.concat(packet ? [tmp, packet] : [tmp]) )
				}
				
				this.$models[ID] = {
					model: v,
					name : k,
				}
			})
	}
	$subscribe(obj) {
		this.$subscribes = this.$subscribes || {}
		Object.assign(this.$subscribes, obj)
	}
	$write(packet) {
		const cmd = packet.readUInt16LE(0)
		const msg = packet.slice(2)
		const model = this.$models[cmd]
		if ( !model )
			return
		
		const handler = this.$subscribes[model.name]
		if ( !handler )
			return

		handler( model.model(msg) )
	}
	$onwrite = () => {}
}

module.exports = MessagesMng
