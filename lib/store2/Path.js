const sep = '/'

export const joinBare = (...pp) => {
  const result = sanitize(
    pp
      //   [[a b] c] => [[a b] [c]]
      .map(p => Array.isArray(p) ? p : [p])
      //   [[a b] [c]] => [a b c]
      .reduce((newPP, p) => newPP.concat(p), [])
      //   [a b c] => a/b/c
      .join(sep)
  )
  return result
}

export const join = (...pp) => {
  const result = sep + joinBare(...pp)
  return result
}

export const sanitize = (path) => {
  return (path || '')
    //   a//b => a/b
    .replace(/\/+/g, '/')
    //   /x/ => x
    .replace(/^\/|\/$/g, '')
}

export const split = (path) => {
  path = sanitize(path)
  return path ? path.split(sep) : []
}
