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

export function changeTo(fullPath, ...relPaths) {
  const [repo, path] = splitRepo(fullPath)
  return joinRepo(repo, ...(
    relPaths
      .map(split)
      .reduce((a, b) => a.concat(b), [])
      .reduce(
        (pp, relPath) => _changeTo(pp, relPath),
        split(path),
      )
  ))
}

export function join(...pp) {
  pp = pp.map(sanitize).filter(p => p)
  return sanitize(pp.join('/'))
}

export function joinRepo(repo, ...pp) {
  return join(repo.replace(/:$/, '') + ':', ...pp)
}

export function sanitize(path) {
  return path.replace(/\/+/g, '/').replace(/^\/|\/$/g, '').replace(':/', ':')
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
