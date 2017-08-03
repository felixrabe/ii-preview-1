import Thing from './Thing'

export default class Things {
  constructor({onChange}) {
    this._onChange = onChange
    this._things = []
    this._thingsByKey = {}
    this._nextKey = 0
  }

  add = (thing) => {
    if (!(thing instanceof Thing)) {
      thing = new Thing(thing)
    }

    const key = this._nextKey++
    thing.setKey(key)
    this._thingsByKey[key] = thing
    this._things.push(thing)
    this._onChange(this)
    return key
  }

  remove = (key) => {
    const thing = this._thingsByKey[key]
    delete this._thingsByKey[key]
    this._things = this._things.filter(t => t !== thing)
    this._onChange(this)
    return thing
  }

  render = () => {
    return this._things.map(t => t.render())
  }
}
