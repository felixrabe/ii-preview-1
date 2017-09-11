const multipipe = require('multipipe')

const InLinesTransform = require('ii-1-util-streams/InLinesTransform')
const JSONToObjTransform = require('ii-1-util-streams/JSONToObjTransform')

const ExecCLITransform = require('./ExecCLITransform')

module.exports = function makeStream() {
  return multipipe(
    new InLinesTransform(),
    new JSONToObjTransform(),
    new ExecCLITransform(),
  )
}
