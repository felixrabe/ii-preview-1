import _ from 'lodash'

const actions = {}
export default actions

const createAction = (n, cb) => {
  const cName = _.snakeCase(n).toUpperCase()  // foo bar => FOO_BAR
  const fName = _.camelCase(n)  // foo bar => fooBar
  const typeObj = {type: n}
  actions[cName] = cName
  actions[fName] = (...args) => {
    return Object.assign({}, typeObj, cb(...args))
  }
}

createAction('set path', path => ({path}))
createAction('set full data', data => ({data}))
createAction('set data', (key, value) => ({key, value}))
