
const fs = require("fs")
const path = require("path")

class Log_ {
	constructor(filePath) {
		this.logFilePath = filePath
		this.intervalID = null;
		this.text = "";
	
		fs.mkdirSync(path.dirname(filePath), { recursive: true })
	
		this.intervalID = setInterval(() => {
			this.swap();
		}, 1000);
	}

	close() {
		this.swap();
		if ( this.intervalID != null )
			clearInterval(this.intervalID);
		this.intervalID = null;
	}

	create(logFilePath) {
		this.logFilePath = logFilePath;
		fs.mkdirSync(path.dirname(this.logFilePath), { recursive: true })
	}
	
	notice(text, flush = false) {
		this._append( `[Notice] ${text} \n`, flush )
	}
	error(text, flush = false) {
		this._append( `[Error] ${text} \n`, flush )
	}
	
	_append(text, flush = false) {
		const d = new Date()
		const timeStr = "[" + d.toLocaleDateString() + " " + d.toLocaleTimeString() + "." + String(+d % 1000).padStart(3, 0) + "]"
		
		this.text += timeStr + " " + text
		if ( flush )
			this.flush();
	}

	swap() {
		try {
			if ( this.text.length )
				fs.appendFileSync(this.logFilePath, this.text);
		} catch(e) {
		}
		
		this.text = "";		
	}
	flush() {
		this.swap();
	}
}

module.exports = Log_;
