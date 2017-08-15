import Source from './Source'

export default class SourceJSON extends Source {
  async list(path) {
    const start = path + (path ? '/' : '')
    const keys = Object.keys(data)
      .filter(k => k.startsWith(start))
      .map(k => {
        const ki = k.indexOf('/', start.length)
        return k.slice(start.length, (ki === -1) ? undefined : ki)
      })
      .reduce((keys, k) => {
        keys[k] = true
        return keys
      }, {})

    const keysArray = Object.keys(keys).sort()
    return keysArray.length ? keysArray : undefined
  }

  async get(path) {
    const pp = split(path)
    if (pp[pp.length - 1] === 'ii_dir') {
      path = join(...pp.slice(0, pp.length - 1))
      return await this.list(path)
    } else {
      return data[path]
    }
  }

  async set(path, value) {  // eslint-disable-line no-unused-vars
    return undefined  // read-only store
  }

  async delete(path) {  // eslint-disable-line no-unused-vars
    return undefined  // read-only store
  }
}
