import D from 'draft-js'
import _ from 'lodash'

import actions from '../actions/index'

const defaultState = {
  items: {},
  layout: [],
  name: '',
}

const defaultLayoutItem = {x: 0, y: 0, w: 2, h: 2, static: false}
const defaultLayoutItemKeys = _.keys(defaultLayoutItem)

const world = (state = defaultState, action) => {
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
        [k, new v.constructor(_.omit(v, defaultLayoutItemKeys))]
      ))),
    }
    localStorage.setItem(pfx + 'items', JSON.stringify(items))
    localStorage.setItem(pfx + 'layout', JSON.stringify(layout))
    return {...state, items, layout}
  case actions.REDUCE:
    return action.f(state)
  case actions.REMOVE_ITEMS:
    var items = _.omit(state.items, action.items)
    var layout = state.layout.filter(({i}) => !action.items.includes(i))
    return {...state, items, layout}
  case actions.RESET:
    localStorage.removeItem(pfx + 'items')
    localStorage.removeItem(pfx + 'layout')
    return world(defaultState, actions.setDefaults())
  case actions.SET_DEFAULTS:
    if (_.size(state.items) === 0 && _.size(state.layout) === 0) {
      const command = {type: 'Command'}
      const items = JSON.parse(localStorage.getItem(pfx + 'items') || '{}')
      const layout = JSON.parse(localStorage.getItem(pfx + 'layout') || '[]')
      return world({...state, items, layout}, actions.addItems({command}))
    } else {
      return state
    }
  case actions.SET_DEFAULTS_FOR_ITEMS:
    var items = {...state.items}
    for (const key of Object.keys(action.items)) {
      const i = action.items[key]
      items[key] = Object.assign(new i.constructor(), i, items[key])
    }
    var layoutByKey = _.fromPairs(state.layout.map(li => [li.i, li]))
    var layout = state.layout
      .filter(item => !action.items[item.i])
      .concat(_.toPairs(action.items).map(([k, v]) => ({
        ...defaultLayoutItem,
        ..._.pick(v, defaultLayoutItemKeys),
        ...layoutByKey[k],
        i: k,
      })))
    return {...state, items, layout}
  case actions.SET_LAYOUT:
    var layout = action.layout
    localStorage.setItem(pfx + 'layout', JSON.stringify(layout))
    return {...state, layout}
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
        [k, new v.constructor({
          ...state.items[k],
          ..._.omit(v, defaultLayoutItemKeys),
        })]
      ))),
    }
    localStorage.setItem(pfx + 'items', JSON.stringify(items))
    return {...state, items}
  default:
    return state
  }
}

export default world
