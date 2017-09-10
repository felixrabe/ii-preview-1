const createMethod = (server, servers, method) => {
  server[method] = (cb) => {
    cb = cb || (() => {})
    const promises = servers.map(s => new Promise(r => s[method](r)))
    Promise.all(promises).then(cb)
  }
}

module.exports = function createServer(servers) {
  const server = {}

  createMethod(server, servers, 'close')
  createMethod(server, servers, 'listen')

  return server
}
