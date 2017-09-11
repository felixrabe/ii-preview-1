const hashCodes = Object.create(null)

let hadError = false

const reload = async (path) => {
  let code
  try {
    code = await fetchText(path)
  } catch (err) {
    hadError = true
    return  // ignore
  }
  if (hadError) console.clear()
  hadError = false

  const newHashCode = code.hashCode()
  if (!(path in hashCodes)) {
    hashCodes[path] = newHashCode
  } else if (hashCodes[path] !== newHashCode) {
    location.reload()
  }
}

const reloadAll = () => {
  Object.keys(load.registry).forEach(path => reload(path))
}

reloadAll()
setInterval(reloadAll, 2000)
