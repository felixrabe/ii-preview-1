const connect = require('connect')
const path = require('path')
const serveStatic = require('serve-static')

const nodeModulesPath = path.resolve(__dirname, '../../../node_modules')
const route = module.exports = connect()
route.use('/node_modules', serveStatic(nodeModulesPath, {index: false}))
route.use(serveStatic(__dirname, {index: false}))
