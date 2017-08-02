export default class Things {
  constructor({onChange}) {
    this._onChange = onChange
    this._things = []
  }

  add = (thing) => {
    this._things.push(thing)
    this._onChange(this)
  }

  remove = (thing) => {
    this._things = this._things.filter(t => t !== thing)
    this._onChange(this)
  }

  render = () => {
    return this._things.map(t => t.render())
  }
}
