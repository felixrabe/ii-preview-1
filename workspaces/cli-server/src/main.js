const ChildSupervisor = require('./ChildSupervisor')
const onShutdown = require('./onShutdown')
const parseArguments = require('./parseArguments')

module.exports = () => {
  const {scriptPath, sockPath} = parseArguments()
  const childSupervisor = new ChildSupervisor(scriptPath, sockPath)

  onShutdown(async () => {
    await childSupervisor.kill()
  })
}
