
const RECT_LIST_CLEAR = 1;
const RECT_SET = 2;
const RECT_DEL = 3;

function createRect(id, x = 0, y = 0, width = 0, height = 0) {
	const b = Buffer.alloc(4*5);
	b.writeInt32LE(id, 0);
	b.writeInt32LE(x, 4);
	b.writeInt32LE(y, 8);
	b.writeInt32LE(width, 12);
	b.writeInt32LE(height, 16);
	return b;
}
function rectListClear() {
	return createPacket(RECT_LIST_CLEAR);
}
function rectSet(...args) {
	return createPacket(RECT_SET, createRect(...args));
}
function rectDel(id) {
	return createPacket(RECT_DEL, createRect(id));
}

class RectMng {
	constructor(udpClient) {
		this.udpClient = udpClient;
		this.nextID = 1;
		this.map = new Map();
		
		const loop = () => {
			this.loop()
			requestAnimationFrame(loop)
		}
		requestAnimationFrame(loop)
	}
	
	loop() {
		for(const v of this.map.values())
			this.updatePos(v)
	}

	set(obj, $elem) {
		const data = this.map.get(obj);
		if ( data ) {
			data.$elem = $elem
		} else {
			this.map.set(obj, {
				id: this.nextID++,
				$elem,
				obj,
			})
		}
		
		this.updatePos(data)
	}
	del(obj) {
		const data = this.map.get(obj)
		if ( !data )
			return;
		
		this.udpClient.send(RECT_DEL, createRect(data.id))
	}
	updatePos(data) {
		if ( !data )
			return
		
		const rect = data.$elem.getBoundingClientRect()
		//Log.notice('updatePos: ' + data.id + ', rect: ' + [rect.x, rect.y, rect.width, rect.height].join(','))

		if ( data.cache 
			&& data.cache.x === rect.x
			&& data.cache.y === rect.y
			&& data.cache.width === rect.width
			&& data.cache.height === rect.height )
			return;
		
		data.cache = rect;
		this.udpClient.send(RECT_SET, createRect(data.id, rect.x, rect.y, rect.width, rect.height))
	}
	updatePosAll() {
		for(const v of this.map.values())
			this.updatePos(v)
	}
	
	createRect(id, x = 0, y = 0, width = 0, height = 0) {
		const b = Buffer.alloc(4*5);
		b.writeInt32LE(id, 0);
		b.writeInt32LE(x, 4);
		b.writeInt32LE(y, 8);
		b.writeInt32LE(width, 12);
		b.writeInt32LE(height, 16);
		return b;
	}	
}

module.exports = RectMng;
