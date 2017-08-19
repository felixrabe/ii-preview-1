export {default} from './actions'

import createAction from './createAction'

createAction('add items', (items) => ({items}))
createAction('reduce', (f) => ({f}))
createAction('reset', () => ({}))
createAction('set defaults', () => ({}))
createAction('set layout', (layout) => ({layout}))
