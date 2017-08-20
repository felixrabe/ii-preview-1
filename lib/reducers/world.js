import D from 'draft-js'
import _ from 'lodash'

import actions from '../actions/index'
import objAssign from '../utils/objAssign'

const defaultState = {
  items: {},
  layout: [],
  name: '',
}

const defaultLayoutItem = {x: 0, y: 0, w: 2, h: 2, static: false}
const defaultLayoutItemKeys = _.keys(defaultLayoutItem)

const noSave = (action) => ({...action, _setItems: false, _setLayout: false})

const world = (state = defaultState, action) => {
  action = {_setItems: true, _setLayout: true, ...action}
  const pfx = `ii-world-${state.name}-`
  switch (action.type) {
  case actions.ADD_ITEMS:
    var newItems = _.toPairs(action.items)
    var layout = state.layout
      .filter(item => !action.items[item.i])
      .concat(newItems.map(([k, v]) => ({
        ...defaultLayoutItem,
        ..._.pick(v, defaultLayoutItemKeys),
        i: k,
      })))
    var items = {
      ...state.items,
      ..._.fromPairs(newItems.map(([k, v]) => (
        [k, objAssign(new v.constructor(), _.omit(v, defaultLayoutItemKeys))]
      ))),
    }
    state = {...state, items, layout}
    break
  case actions.REDUCE:
    state = action.f(state)
    break
  case actions.REMOVE_ITEMS:
    var items = _.omit(state.items, action.items)
    var layout = state.layout.filter(({i}) => !action.items.includes(i))
    state = {...state, items, layout}
    break
  case actions.RESET:
    localStorage.removeItem(pfx + 'items')
    localStorage.removeItem(pfx + 'layout')
    state = world(
      objAssign(defaultState, {name: state.name}),
      noSave(actions.setDefaults()),
    )
    break
  case actions.SET_DEFAULTS:
    if (_.size(state.items) === 0 && _.size(state.layout) === 0) {
      const command = {type: 'Command'}
      const items = JSON.parse(localStorage.getItem(pfx + 'items') || '{}')
      const layout = JSON.parse(localStorage.getItem(pfx + 'layout') || '[]')
      state = world(
        {...state, items, layout},
        noSave(actions.addItems({command})),
      )
    }
    break
  case actions.SET_DEFAULTS_FOR_ITEMS:
    var layoutByKey = _.fromPairs(state.layout.map(li => [li.i, li]))
    var layout = state.layout
      .filter(item => !action.items[item.i])
      .concat(_.toPairs(action.items).map(([k, v]) => ({
        ...defaultLayoutItem,
        ...layoutByKey[k],
        ..._.pick(v, defaultLayoutItemKeys),
        i: k,
      })))
    var items = {
      ...state.items,
      ..._.fromPairs(Object.keys(action.items)
        .map(k => [k, action.items[k]])
        .map(([k, v]) => (
          [k, objAssign(
            new v.constructor(),
            _.omit(v, defaultLayoutItemKeys),
            state.items[k],
          )]
        ))
      ),
    }
    state = {...state, items, layout}
    break
  case actions.SET_LAYOUT:
    state = {...state, layout: action.layout}
    action._setItems = false
    break
  case actions.UPDATE_ITEMS:
    var existingKeys = Object.keys(state.items)
    var [existingItems, newItems] = _.partition(
      _.toPairs(action.items),
      ([k]) => existingKeys.includes(k),
    )
    state = world(state, actions.addItems(_.fromPairs(newItems)))
    var items = {
      ...state.items,
      ..._.fromPairs(existingItems.map(([k, v]) => (
        [k, objAssign(new v.constructor(), state.items[k], _.omit(v, defaultLayoutItemKeys))]
      ))),
    }
    state = {...state, items}
    action._setLayout = false
    break
  default:
    action = noSave(action)
  }
  if (action._setItems) {
    localStorage.setItem(pfx + 'items', JSON.stringify(state.items))
  }
  if (action._setLayout) {
    localStorage.setItem(pfx + 'layout', JSON.stringify(state.layout))
  }
  return state
}

export default world
