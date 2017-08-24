import _ from 'lodash'

import actions from './actions'

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
let isAsyncFunction
if (AsyncFunction !== Function) {
  // Does not work because Babel transpiles (async () => ...) to (() => ...):
  isAsyncFunction = (f) => f instanceof AsyncFunction
} else {
  isAsyncFunction = (f) => f.toString().startsWith('function (_x')
}

const createAction = (n, cb) => {
  const cName = _.snakeCase(n).toUpperCase()  // foo bar => FOO_BAR
  const fName = _.camelCase(n)  // foo bar => fooBar
  actions[cName] = cName
  if (typeof cb === 'undefined') {
    cb = () => ({})
  }
  if (isAsyncFunction(cb)) { // thunk
    // createAction('fetch url', async (dispatch, url) => { ... })
    actions[fName] = (...args) => (dispatch) => cb(dispatch, ...args)
  } else {
    // createAction('add world', (name) => ({name}))
    const typeObj = {type: cName}
    actions[fName] = (...args) => Object.assign({}, typeObj, cb(...args))
  }
}

export default createAction
