const handler = {
  get: (t, n, p) => {
    if (n in t) {
      return t[n]
    } else if (n === 'then') {
      return undefined
    } else {
      throw new TypeError(`undefined action "${n}"`)
    }
  },
}

const actions = new Proxy({}, handler)

export const __useDefault = actions
export default __useDefault
