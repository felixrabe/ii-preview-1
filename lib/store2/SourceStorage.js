import {join, split} from './Path'
import Source from './Source'

export default class SourceStorage extends Source {
  constructor(storage = localStorage, prefix = '') {
    super()
    this.storage = storage
    this.prefix = prefix
  }

  delete = async (pp) => {
    const path = join(pp)
    const start = this.prefix + path
    const keys = []
    for (let i = 0; i < this.storage.length; i++) {
      const k = this.storage.key(i)
      if (k.startsWith(start)) {
        keys.push(k)
      }
    }
    keys.forEach(k => this.storage.removeItem(k))
  }

  dir = async (pp) => {
    const path = join(pp)
    const start = this.prefix + path + (path.length > 1 ? '/' : '')
    const keys = {}
    for (let i = 0; i < this.storage.length; i++) {
      const k = this.storage.key(i)
      if (k.startsWith(start)) {
        const ki = k.indexOf('/', start.length)
        keys[k.slice(start.length, (ki === -1) ? undefined : ki)] = true
      }
    }
    return Object.keys(keys).sort()
  }

  get = async (pp) => {
    const item = this.storage.getItem(this.prefix + join(pp))
    return (item === null) ? undefined : JSON.parse(item)
  }

  set = async (pp, aa) => {
    this.storage.setItem(this.prefix + join(pp), JSON.stringify(aa[0]))
  }
}
