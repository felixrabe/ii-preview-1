const path = require('path')
const send = require('send')

const p = require.resolve('require1k')

module.exports = (req, res) => send(req, p).pipe(res)
