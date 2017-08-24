export {default} from './actions'

import createAction from './createAction'

createAction('change world', (name) => ({name}))
createAction('create world', (name) => ({name}))
createAction('load')
createAction('reduce world', (reducer) => ({reducer}))
