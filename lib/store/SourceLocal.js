import Source from './Source'
import {join, split} from './Path'

export default class SourceLocal extends Source {
  constructor({prefix}) {
    super()
    this.storage = localStorage
    this.prefix = prefix
  }

  // eslint-disable-next-line complexity
  async list(path) {
    const start = this.prefix + path + (path ? '/' : '')
    const keys = {}
    for (let i = 0; i < this.storage.length; i++) {
      const k = this.storage.key(i)
      if (k.startsWith(start)) {
        const ki = k.indexOf('/', start.length)
        keys[k.slice(start.length, (ki === -1) ? undefined : ki)] = true
      }
    }

    const keysArray = Object.keys(keys).sort()

    return keysArray.length ? keysArray : undefined
  }

  async get(path) {
    const pp = split(path)
    if (pp[pp.length - 1] === 'ii_dir') {
      path = join(...pp.slice(0, pp.length - 1))
      return await this.list(path)
    } else {
      const item = this.storage.getItem(this.prefix + path)
      return (item === null) ? undefined : JSON.parse(item)
    }
  }

  async set(path, value) {
    this.storage.setItem(this.prefix + path, JSON.stringify(value))
  }

  async delete(path) {
    this.storage.removeItem(this.prefix + path)
  }
}
