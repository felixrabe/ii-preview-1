export {default} from './actions'

import createAction from './createAction'

createAction('add items', (items) => ({items}))
createAction('reduce', (f) => ({f}))
createAction('remove items', (items) => ({items}))
createAction('reset', () => ({}))
createAction('set defaults', () => ({}))
createAction('set layout', (layout) => ({layout}))
createAction('update items', (items) => ({items}))
