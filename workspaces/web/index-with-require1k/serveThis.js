const path = require('path')
const send = require('send')

const p = path.join(__dirname, 'index.html')

module.exports = (req, res) => send(req, p).pipe(res)
