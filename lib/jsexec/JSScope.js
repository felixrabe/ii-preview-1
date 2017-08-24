import D from 'draft-js'
import _ from 'lodash'

export default class JSScope {
  constructor(vars) {
    this.vars = vars
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
