const fs = require('fs')

module.exports = (opts) => {
  if (typeof opts !== 'object') return {}

  return {
    resolveId(importee, importer) {
      let found = undefined
      Object.keys(opts).find((key) => {
        if (importee !== key) return false
        const p = opts[key]
        if (!fs.existsSync(p)) return false
        found = p
        return true
      })
      return found
    }
  }
}
