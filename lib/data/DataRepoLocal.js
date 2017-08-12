import DataRepo from './DataRepo'

export default class DataRepoLocal extends DataRepo {
  constructor(prefix) {
    super()
    this.storage = localStorage
    this.prefix = prefix
  }

  async get(path) {
    return JSON.parse(this.storage.getItem(this.prefix + path))
  }
}
