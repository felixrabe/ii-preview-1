export {default} from './actions'

import createAction from './createAction'

createAction('add world', (name) => ({name}))
createAction('load', () => ({}))
