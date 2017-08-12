import delay from '../utils/delay'
import {splitRepo} from './DataPath'

export default class DataAccess {
  constructor(repos) {
    this.repos = repos
  }

  async get(repo, path) {
    if (typeof path === 'undefined') {
      [repo, path] = splitRepo(repo)
    }

    while (typeof repo === 'string') {
      repo = this.repos[repo]
    }

    await delay()
    if (typeof repo === 'undefined') {
      return undefined
    }

    return await repo.get(path)
  }
}
