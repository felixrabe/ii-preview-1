const hashCodes = {}

const reload = async (path) => {
  let code
  try {
    code = await fetchText(path)
  } catch (err) {
    return  // ignore
  }

  const newHashCode = code.hashCode()
  if (hashCodes[path] === undefined) {
    hashCodes[path] = newHashCode
  } else if (hashCodes[path] !== newHashCode) {
    location.reload()
  }
}

const reloadAll = () => {
  Object.keys(load.registry).forEach(path => reload(path))
}

reloadAll()
setInterval(reloadAll, 1500)
