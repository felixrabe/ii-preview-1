import DataRepo from './DataRepo'

export default class DataRepoLocal extends DataRepo {
  constructor(prefix) {
    super()
    this.storage = localStorage
    this.prefix = prefix
  }

  async get(path) {
    const item = this.storage.getItem(this.prefix + path)
    return (item === null) ? undefined : JSON.parse(item)
  }
}
