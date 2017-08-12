import DataRepo from './DataRepo'

export default class DataRepoImport extends DataRepo {
  async get(path) {
    path = path.replace(/:/g, '%3A')
    System.registry.delete(System.resolveSync(path))
    return await System.import(path)
  }
}
