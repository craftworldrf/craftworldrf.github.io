
const dgram = require("dgram")
const {EventEmitter} = require("events")

class UDPClient extends EventEmitter {
	constructor(port, host = "127.0.0.1", Log) {
		super();
		
		this.port = port;
		this.host = host;

		this.udp = dgram
			.createSocket("udp4")
			.bind(0, "127.0.0.1")
			.on("listening", () => {
				const address = this.udp.address()
				//Log.notice(`UDPClient listening ${address.address}:${address.port}`)
			})
			.on("message", msg => {
				this.emit("message", msg)

				const [cmd, data] = this.parsePacket(msg);
				this.emit(`recv:${cmd}`, data);
				this.emit(`recv`, cmd, data);
			});	
		
	}

	send(cmd, data) {
		this.udp.send(this.createPacket(cmd, data), this.port, this.host, () => {});
	}

	sendPacket(packet) {
		this.udp.send(packet, this.port, this.host, () => {})
	}
	
	createPacket(cmd, data) {
		const b = Buffer.alloc(2 + (data ? data.length : 0));
		b.writeUInt16LE(cmd, 0)
		if ( data )
			data.copy(b, 2)
		return b;
	}
	parsePacket(buf) {
		return [buf.readUInt16LE(0), buf.subarray(2)];
	}

	static connect(host, port) {
		return new this(port, host)
	}
};

module.exports = UDPClient;