const multipipe = require('multipipe')

const InLinesTransform = require('ii-1-streams/InLinesTransform')
const JSONToObjTransform = require('ii-1-streams/JSONToObjTransform')

const ExecCLITransform = require('./ExecCLITransform')

module.exports = function makeStream() {
  return multipipe(
    new InLinesTransform(),
    new JSONToObjTransform(),
    new ExecCLITransform(),
  )
}
