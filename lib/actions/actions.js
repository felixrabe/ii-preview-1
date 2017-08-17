import actions from './actionsMap'
import createAction from './createAction'

export default actions

createAction('delete key', (key) => ({key}))
createAction('set data', (data) => ({data}))
createAction('set key value', (key, value) => ({key, value}))
createAction('set path', (path) => ({path}))
