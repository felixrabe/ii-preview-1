const path = require('path')
const send = require('send')

const p = require.resolve('mr/bootstrap')

module.exports = (req, res) => send(req, p).pipe(res)
