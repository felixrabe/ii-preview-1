import {sanitize, splitRepo} from './Path'

export default class Store {
  constructor(repos) {
    this.repos = repos
  }

  repoPath(repo, path) {
    if (typeof path === 'undefined') {
      [repo, path] = splitRepo(repo)
    }

    while (typeof repo === 'string') {
      repo = this.repos[repo]
    }

    return [repo, sanitize(path)]
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
