import D from 'draft-js'
import _ from 'lodash'

import actions from '../actions/index'

const defaultState = {
  items: {},
  layout: [],
}

const defaultLayoutItem = {x: 0, y: 0, w: 1, h: 1, static: false}
const defaultLayoutItemKeys = _.keys(defaultLayoutItem)

const main = (state = defaultState, action) => {
  switch (action.type) {
  case actions.ADD_ITEMS:
    var newItems = _.toPairs(action.items)
    var layout = state.layout
      .filter(item => !action.items[item.i])
      .concat(newItems.map(([k, v]) => ({
        ...defaultLayoutItem,
        i: k,
        ..._.pick(v, defaultLayoutItemKeys)
      })))
    var items = {
      ...state.items,
      ..._.fromPairs(newItems.map(([k, v]) => ([k, {
        ..._.omit(v, defaultLayoutItemKeys)
      }]))),
    }
    localStorage.setItem('ii-items', JSON.stringify(items))
    localStorage.setItem('ii-layout', JSON.stringify(layout))
    return {...state, items, layout}
  case actions.REDUCE:
    return action.f(state)
  case actions.RESET:
    localStorage.removeItem('ii-items')
    localStorage.removeItem('ii-layout')
    return main(defaultState, actions.setDefaults())
  case actions.SET_DEFAULTS:
    if (_.size(state.items) === 0 && _.size(state.layout) === 0) {
      const toolbar = {w: 12, h: 2, static: true}
      const items = JSON.parse(localStorage.getItem('ii-items') || '{}')
      const layout = JSON.parse(localStorage.getItem('ii-layout') || '[]')
      return main({...state, items, layout}, actions.addItems({toolbar}))
    } else {
      return state
    }
  case actions.SET_LAYOUT:
    var layout = action.layout
    localStorage.setItem('ii-layout', JSON.stringify(layout))
    return {...state, layout}
  default:
    return state
  }
}

export default main
