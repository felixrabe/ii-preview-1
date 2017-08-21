export default class BaseItem {
  constructor(item) {
    Object.assign(this, item)
  }

  toJSON() {
    return this
  }
}
