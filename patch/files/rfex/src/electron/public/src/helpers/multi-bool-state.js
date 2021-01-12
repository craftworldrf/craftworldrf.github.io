const { EventEmitter } = require('events')

class MultiBoolState extends EventEmitter {
	constructor(num, target = true, forceUpdate = true) {
		super()
		this.num = num
		this.target = target
		this.forceUpdate = forceUpdate
		this.obj = {}
		this.val = -1;
	}
	
	set(key, val) {
		this.obj[key] = val
		const vals = Object.values(this.obj)
		if ( vals.length !== this.num )
			return;

		const fl = vals.every(v => v === this.target)
		const needUpdate = fl !== this.val
		this.val = fl
		
		if ( needUpdate || this.forceUpdate )
			this.emit("update", fl)
	}
}

module.exports = MultiBoolState
