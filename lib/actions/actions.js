const handler = {
  get: (t, n, p) => {
    if (t[n]) {
      return t[n]
    } else {
      throw new TypeError(`undefined action "${n}"`)
    }
  },
}

const actions = new Proxy({}, handler)

export default actions
