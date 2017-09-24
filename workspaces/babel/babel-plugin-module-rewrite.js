// Based on babel-plugin-module-rewrite@0.2.0, MIT licensed:
// https://github.com/liady/babel-plugin-module-rewrite/tree/823ee3314de63c15b0cb22166a49cbce08742d2c

'use strict'

var _path = require('path')

function getReplaceFunc({replaceFunc}) {
  return replaceFunc
}

module.exports = function (_ref2, a, b) {
  var t = _ref2.types

  var cachedReplaceFunction = void 0

  function mapModule(source, file, state) {
    var opts = state.opts
    if (!cachedReplaceFunction) {
      cachedReplaceFunction = getReplaceFunc(opts)
    }
    var replace = cachedReplaceFunction
    var result = replace(source, file, opts)
    if (result !== source) {
      return result
    } else {
      return
    }
  }

  function transformRequireCall(nodePath, state) {
    if (!t.isIdentifier(nodePath.node.callee, { name: 'require' }) && !(t.isMemberExpression(nodePath.node.callee) && t.isIdentifier(nodePath.node.callee.object, { name: 'require' }))) {
      return
    }

    var moduleArg = nodePath.node.arguments[0]
    if (moduleArg && moduleArg.type === 'StringLiteral') {
      var modulePath = mapModule(moduleArg.value, state.file.opts.filename, state)
      if (modulePath) {
        nodePath.replaceWith(t.callExpression(nodePath.node.callee, [t.stringLiteral(modulePath)]))
      }
    }
  }

  function transformImportExportCall(nodePath, state) {
    var moduleArg = nodePath.node.source
    if (moduleArg && moduleArg.type === 'StringLiteral') {
      var modulePath = mapModule(moduleArg.value, state.file.opts.filename, state)
      if (modulePath) {
        nodePath.node.source = t.stringLiteral(modulePath)
      }
    }
  }

  return {
    visitor: {
      CallExpression: {
        exit: function exit(nodePath, state) {
          return transformRequireCall(nodePath, state)
        }
      },
      ImportDeclaration: {
        exit: function exit(nodePath, state) {
          return transformImportExportCall(nodePath, state)
        }
      },
      ExportDeclaration: {
        exit: function exit(nodePath, state) {
          return transformImportExportCall(nodePath, state)
        }
      }
    }
  }
}
