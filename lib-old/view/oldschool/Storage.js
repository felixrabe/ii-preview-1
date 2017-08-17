import {join} from '../../store/Path'

export default class Storage {
  constructor(store, path) {
    this.store = store
    this.path = path
  }

  clear = async () => {
    const dir = await this.keys()
    for (let i = 0; i < dir.length; i++) {
      const key = dir[i]
      const path = join(this.path, key)
      await this.store.delete(path)
    }
  }

  getItem = async (key) => {
    return await this.store.get(join(this.path, key))
  }

  hasItem = async (key) => {
    return (await this.store.get(join(this.path, key))) !== undefined
  }

  keys = async () => {
    const keys = await this.store.get(join(this.path, 'ii_dir'))
    return typeof keys !== 'undefined' ? keys : []
  }

  setItem = async (key, value) => {
    return await this.store.set(join(this.path, key), value)
  }

  removeItem = async (key) => {
    return await this.store.delete(join(this.path, key))
  }
}
