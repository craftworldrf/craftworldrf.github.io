const net = require("net")
const { EventEmitter } = require("events")

class TCPClient extends EventEmitter {
	constructor(tcpSocket) {
		super()

		const parsePacket = buf => [buf.readUInt16LE(0), buf.subarray(2)];		

		let buffer = Buffer.alloc(0)
		const parse = () => {
			if ( buffer.length < 2 )
				return false
			
			const size = buffer.readUInt16LE(0)
			if ( buffer.length < size )
				return false
			
			const packet = buffer.slice(2, size)
			buffer = buffer.slice(size)
			
			this.emit("message", packet)
			
			const [cmd, data] = parsePacket(packet);
			this.emit(`recv:${cmd}`, data);
			this.emit(`recv`, cmd, data);			
			
			return true
		}
		
		tcpSocket
			.on("data", data => {
				buffer = Buffer.concat([buffer, data])
				while( parse() );
			})

		;['close', 'connect', 'end', 'error', 'lookup', 'ready', 'timeout']
			.map(n => tcpSocket.on(n, (...args) => this.emit(n, ...args)))
			
		const tmpBuffer = Buffer.alloc(2)
		const send = data => {
			tmpBuffer.writeUInt16LE(data.length + 2)
			tcpSocket.write(Buffer.concat([tmpBuffer, data]))
		}
		this._send = send
	}
	
	send(cmd, data) {
		this._send(this.createPacket(cmd, data))
	}
	createPacket(cmd, data) {
		const b = Buffer.alloc(2 + (data ? data.length : 0));
		b.writeUInt16LE(cmd, 0)
		if ( data )
			data.copy(b, 2)
		return b;
	}
	
	static connect(host, port) {
		const client = net.createConnection({ port, host }, () => {})
		client.setNoDelay(false)
		return new this(client)
	}
}

module.exports = TCPClient
