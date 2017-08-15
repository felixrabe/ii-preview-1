const sep = '/'

export const join = (...pp) => {
  return pp
    .map(p => Array.isArray(p) ? p : [p])
    .reduce((newPP, p) => newPP.concat(p), [])
    .join(sep)
}

export const sanitize = (path) => {
  return (path || '')
    //   a//b => a/b
    .replace(/\/+/g, '/')
    //   /x/ => x
    .replace(/^\/|\/$/g, '')
}

export const split = (path) => {
  return sanitize(path)
    //   a/b => [a b]
    .split(sep)
}
