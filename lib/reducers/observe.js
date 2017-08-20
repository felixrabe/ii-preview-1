import _ from 'lodash'

import actions from '../actions/index'
import getCurrentWorld from '../selectors/getCurrentWorld'

const defaultsMap = {}

let currentItems
let store

const getDefaultsFor = (items) => {
  const defaultsMapKeys = new Set(Object.keys(defaultsMap))
  return Promise.all(items.map(({type}) => {
    if (defaultsMapKeys.has(type)) {
      return defaultsMap[type]
    }
    const path = `lib/items/${type}Defaults`
    return SystemJS.import(path).then(m => defaultsMap[type] = m.default)
  }))
}

const observer = async () => {
  const state = store.getState()
  const items = getCurrentWorld(state).items

  const previousItems = currentItems || []
  currentItems = Object.keys(items).sort()

  if (previousItems.join(' ') !== currentItems.join(' ')) {
    const newKeysSet = new Set(currentItems)
    previousItems.forEach(k => newKeysSet.delete(k))
    const newKeys = [...newKeysSet]
    const newItems = newKeys.map(k => items[k])
    const newDefaults = await getDefaultsFor(newItems)
    store.dispatch(actions.setDefaultsForItems(
      _.fromPairs(_.zip(newKeys, newDefaults))
    ))
  }
}

let unsubscribe

const observe = (store_) => {
  store = store_
  unsubscribe = store.subscribe(observer)
  return store
}

export default observe
