module.exports = (url) => {
  // see also web-base/loadJS.js
  const raw = ('/' + url + '/').replace(/\/+/g, '/').split('/').slice(1, -1)

  const result = []

  raw.forEach(p => {
    if (p === '.') {
      // ignore
    } else if (p === '..') {
      result.pop()
    } else {
      result.push(p)
    }
  })

  return result.join('/')
}
