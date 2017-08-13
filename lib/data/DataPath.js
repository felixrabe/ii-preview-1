export function _changeTo(pp, relPath) {
  switch (relPath) {
  case '':
  case '.':
    return pp
  case '..':
    return pp.slice(0, pp.length - 1)
  }

  return pp.concat(relPath)
}

export function changeTo(...pp) {
  const [repo, path] = splitRepo(join(...pp))
  pp = split(path).reduce((r, p) => _changeTo(r, p), [])
  return joinRepo(repo, ...pp)
}

export function changeToJail(p0, ...pp) {
  const [repo, root] = splitRepo(changeTo(p0))
  const path = join(...pp)
  pp = split(path).reduce((r, p) => _changeTo(r, p), [])
  return [joinRepo(repo, root), join(...pp)]
}

export function join(...pp) {
  pp = pp.map(sanitize).filter(p => p)
  return sanitize(pp.join('/'))
}

export function joinRepo(repo, ...pp) {
  return join(repo.replace(/:$/, '') + ':', ...pp)
}

export function sanitize(path) {
  return (path || '')
    .replace(/\/+/g, '/')
    .replace(/^\/|\/$/g, '')
    .replace(':/', ':')
}

export function split(path) {
  return sanitize(path).split('/')
}

export function splitRepo(fullPath) {
  const i = fullPath.indexOf(':')
  if (i === -1) {
    return ['default', fullPath]
  } else {
    return [fullPath.substr(0, i), fullPath.substr(i + 1)]
  }
}
