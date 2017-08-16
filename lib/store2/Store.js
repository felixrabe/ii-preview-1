import {join, sanitize, split} from './Path'
import SourceJS from './SourceJS'

export default class Store {
  constructor(data) {
    this.data = data
    this.listeners = {}
  }

  async callListeners(mName, pp, aa) {
    const path = join(pp)
    let listenerArray = this.listeners[pp] || []
    while (pp.length > 0) {
      const p = pp.pop()
      listenerArray = listenerArray.concat(this.listeners[pp] || [])
    }
    for (let i = 0; i < listenerArray.length; i++) {
      listenerArray[i](mName, path, aa)
    }
  }

  async delete(path) {
    const pp = split(path)
    const result = await this.data.delete(pp)
    await this.callListeners('delete', pp, [])
    return result
  }

  async dir(path) {
    return await this.data.dir(split(path))
  }

  async get(path) {
    return await this.data.get(split(path))
  }

  async set(path, value) {
    const pp = split(path)
    const result = await this.data.set(pp, [value])
    await this.callListeners('set', pp, [value])
    return result
  }

  subscribe(path, cb) {
    const pp = split(path)
    const listenerArray = this.listeners[pp] || []
    this.listeners[pp] = listenerArray.concat([cb])
  }

  unsubscribe(path, cb) {
    const pp = split(path)
    const listenerArray = this.listeners[pp] || []
    this.listeners[pp] = listenerArray.filter(_cb => _cb !== cb)
  }
}
