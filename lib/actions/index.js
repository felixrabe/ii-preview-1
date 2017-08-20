export {default} from './actions'

import createAction from './createAction'

createAction('add items', (items) => ({items}))
createAction('change world', (worldName) => ({worldName}))
createAction('execute', (code, output) => ({code, output}))
createAction('reduce', (f) => ({f}))
createAction('remove items', (items) => ({items}))
createAction('rename item', (from, to) => ({from, to}))
createAction('reset', () => ({}))
createAction('set defaults', () => ({}))
createAction('set defaults for items', (items) => ({items}))
createAction('set layout', (layout) => ({layout}))
createAction('update items', (items) => ({items}))
