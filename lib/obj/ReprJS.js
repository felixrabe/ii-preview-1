// Based on: https://github.com/schettino72/repr.js, MIT license

/* eslint-disable complexity, max-statements */

// eslint-disable-next-line max-len
// https://github.com/schettino72/repr.js/blob/2dae05334a0a807d7a834606dd9a190c0b98e84b/repr.js

/* A more descriptive represetation of values than Object.toString() */
export const repr = (obj, _visitedSet) => {
  if (_visitedSet === undefined) {
    _visitedSet = new Set()
  }

  if (obj === undefined) {
    return '<undefined>'
  }

  if (obj === null) {
    return '<null>'
  }

  const objType = typeof (obj)
  if (objType === 'string') {
    return `"${obj}"`
  }

  if (obj instanceof Array) {
    if (_visitedSet.has(obj)) {
      return '<circular-ref []>'
    }

    _visitedSet.add(obj)
    return `[${obj.map(i => repr(i, _visitedSet)).join(', ')}]`
  }

  // a function is considered to be a "Constructor"
  // if anything is added its prototype
  if (obj instanceof Function) {
    const proto = obj.prototype
    for (const _name in proto) {
      if (proto.hasOwnProperty(_name)) {
        return `<Constructor ${obj.name}>`
      }
    }

    // just a plain function
    return `<Function ${obj.name || '(anon)'}>`
  }

  if (objType === 'object') {
    if (_visitedSet.has(obj)) {
      return '<circular-ref {}>'
    }

    _visitedSet.add(obj)

    let protoName = Object.getPrototypeOf(obj).constructor.name
    // if not a plain object includes the constructor name
    if (protoName === 'Object') {
      protoName = null
    }

    const itemStr = repr.objItems(obj, !protoName, _visitedSet)
    if (protoName) {
      return `<${protoName} ${itemStr}>`
    } else {
      return itemStr
    }
  }

  // use default for other types
  return obj.toString()
}

/* return repr string for object items */
repr.objItems = function (obj, includeFunctions, _visitedSet) {
  // include object attributes but not methods
  const items = []
  for (const _name in obj) {
    if (obj.hasOwnProperty(_name)) {
      // ignore methods
      if (includeFunctions || !(obj[_name] instanceof Function)) {
        items.push(repr(_name) + ': ' + repr(obj[_name], _visitedSet))
      }
    }
  }

  return `{${items.join(', ')}}`
}
