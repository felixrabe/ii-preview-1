import D from 'draft-js'
import _ from 'lodash'

import BaseItem from '../items/BaseItem'

export default class JSScope {
  constructor(world) {
    this.vars = _.cloneDeepWith(world.items, (value) => (
      value instanceof BaseItem ? value.toJSON() : undefined
    ))
  }

  set(k, v) {
    this.vars[k] = v
  }

  keys() {
    return Object.keys(this.vars).sort()
  }

  valuesForKeys(keys) {
    return keys.map(k => this.vars[k])
  }
}
