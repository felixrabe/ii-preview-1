const childProcess = require('child_process')
const path = require('path')

const removeSocket = require('./removeSocket')

const childPath = path.resolve(__dirname, '..', 'bin', 'server-child.js')

module.exports = class ChildSupervisor {
  constructor(scriptPath, sockPath) {
    this.scriptPath = scriptPath
    this.sockPath = sockPath
    this.childEnsureConnected()
  }

  childEnsureConnected() {
    if (this.child && this.child.connected) return this.child
    // console.log('ChildSupervisor.js:', 'Starting child process...')
    removeSocket()
    this.child = childProcess.fork(childPath, [this.scriptPath], {silent: false})
    this.child.once('exit', this.child.exitRestartHandler = () => {
      console.log('ChildSupervisor.js:', 'Child process died, restarting...')
      this.child = undefined
      this.childEnsureConnected()
    })
    this.child.on('message', (message) => {
      switch (message) {
      case 'ready!':
        // console.log('ChildSupervisor.js:', 'Child process ready.')
        break
      case 'down!':
        console.log('ChildSupervisor.js:', 'Child process down.')
        break
      }
    })
    this.child.send('ready?')
    return this.child
  }

  async kill() {
    // console.log('ChildSupervisor.js:', 'Killing child process.')
    this.child.removeListener('exit', this.child.exitRestartHandler)

    this.child.once('exit', () => {
      console.log('ChildSupervisor.js:', 'EXIT')
    })
    await new Promise(r => setTimeout(r, 5000))
    this.child.kill()
    while (this.child.connected) {
      // console.log('ChildSupervisor.js:', 'connected')
      await new Promise(r => setTimeout(r, 5))
    }
    // console.log('ChildSupervisor.js:', 'Done.')
  }

  wait() {
    return this.childEnsureConnected()
  }
}
