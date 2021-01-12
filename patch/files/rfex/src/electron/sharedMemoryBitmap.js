
const SharedMemoryBitmapNode = require('./../nodejs-addon-shared-memory-bitmap/build/Release/shared-memory-bitmap.node')

class SharedMemoryBitmap {
	constructor(width, height, maxNumCells = 64) {
		this.width  = width
		this.height = height
		
		Object.assign(this, this._getGridSize(width, height, maxNumCells))	
	}

	create() {
		const sharedMemoryName = 'Local\\rfex-shared-memory-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2)
		try {
			SharedMemoryBitmapNode.Create( 
				sharedMemoryName,
				this.numColumns,
				this.numRows,
				this.cellSize
			)
			
			Log.notice('[SharedMemoryBitmap] ' + `Created '${ sharedMemoryName }', grid: ${ this.numColumns }x${ this.numRows }, cellSize: ${ this.cellSize }, memSize: ${ SharedMemoryBitmapNode.GetSize() }`)
		} catch(e) {
			Log.error('[SharedMemoryBitmap] ' + e.message)
			return false
		}
		
		this.sharedMemoryName = sharedMemoryName
		return true
	}

	_getGridSize(w, h, maxNumCells) {
		const numPixels = w * h
		for(let i = 2; 1; i *= 2) {
			if ( i * i * maxNumCells >= numPixels ) {
				const numColumns = Math.ceil(w / i)
				const numRows    = Math.ceil(h / i)
				const cellSize   = i
				
				return { numColumns, numRows, cellSize }
			}
		}	
	}

	write(buffer, width, height, dirty) {
		try {
			SharedMemoryBitmapNode.Write( 
				buffer.buffer, 
				buffer.byteOffset, 
				buffer.byteLength,
				
				width, height,
				
				dirty.x, dirty.y, 
				dirty.width, dirty.height 
			)
		} catch(e) {
			Log.error('[SharedMemoryBitmap] ' + e.message)
			return false
		}
	
		return true
	}

}

module.exports = SharedMemoryBitmap
