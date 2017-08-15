import {join} from '../../data/DataPath'

export default class Storage {
  constructor(dataAccess, path) {
    this.dataAccess = dataAccess
    this.path = path
  }

  clear = async () => {
    const dir = await this.keys()
    for (let i = 0; i < dir.length; i++) {
      const key = dir[i]
      const path = join(this.path, key)
      await this.dataAccess.delete(path)
    }
  }

  getItem = async (key) => {
    return await this.dataAccess.get(join(this.path, key))
  }

  hasItem = async (key) => {
    return (await this.dataAccess.get(join(this.path, key))) !== undefined
  }

  keys = async () => {
    const keys = await this.dataAccess.get(join(this.path, 'ii_dir'))
    return typeof keys !== 'undefined' ? keys : []
  }

  setItem = async (key, value) => {
    return await this.dataAccess.set(join(this.path, key), value)
  }

  removeItem = async (key) => {
    return await this.dataAccess.delete(join(this.path, key))
  }
}
