const createLog = () => Object.fromEntries(
	['notice', 'error', 'flush'].map(k => [k, (...args) => ipcRenderer.sendSync('proxy-log', k, ...args)])
)
const Log = createLog()

module.exports = Log