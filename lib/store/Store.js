import {split} from './Path'

export default class Store {
  constructor(tree) {
    this.tree = tree
  }

  async get(path) {
    const pp = split(path)
    const source = this.tree[pp[0]]
  }
}





  async get(repo, path) {
    [repo, path] = this.repoPath(repo, path)

    if (typeof repo === 'undefined') {
      return undefined
    }

    return await repo.get(path)
  }

  async set(repo, path, value) {
    if (typeof value === 'undefined') {
      value = path;
      [repo, path] = this.repoPath(repo, undefined)
    } else {
      [repo, path] = this.repoPath(repo, path)
    }

    if (typeof repo === 'undefined') {
      return undefined
    }

    return await repo.set(path, value)
  }

  async delete(repo, path) {
    [repo, path] = this.repoPath(repo, path)

    if (typeof repo === 'undefined') {
      return undefined
    }

    return await repo.delete(path)
  }
}
