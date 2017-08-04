export default class CommandContext {
  constructor() {
    this._context = {
      context: this,
    }
  }

  dir = () => {
    return Object.keys(this._context).sort()
  }

  find = (cb) => {
    // eslint-disable-next-line no-unused-vars
    const found = Object.entries(this._context).find(([k, v]) => cb(v))
    return typeof found !== 'undefined' ? found[0] : found
  }

  getEntries = () => {
    return Object.entries(this._context)
  }

  import = (shortName, moduleName, key) => {
    if (typeof moduleName === 'undefined') {
      moduleName = 'lib/' + shortName
      key = 'default'
    }

    return System.import(moduleName)
      .then(m => {
        if (key) {
          m = m[key]
        }

        this._context[shortName] = m
        return m
      })
  }

  set = (name, value) => {
    this._context[name] = value
  }

  unset = (name) => {
    delete this._context[name]
  }
}
