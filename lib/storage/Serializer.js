/* Tricky code. Read carefully. */

/* eslint curly: ["error", "multi"] */
/* eslint max-statements: ["error", 15] */
/* eslint padding-line-between-statements: ["off"] */

export function fromJS(value) {
  const type = getType(value)

  if (!fromJSConversions.hasOwnProperty(type))
    return undefined

  return fromJSConversions[type](value)
}

export async function toJS(s) {
  return (await _toJS(s, 0))[1]
}

const _toJS = async (s, i) => {
  return await toJSConversions[s.charAt(i)](s, i)
}

const fromJSConversions = {
  'array': (v) => `a(${v.map(fromJS).join('')})`,
  'boolean': (v) => v ? 't' : 'f',
  'null': () => 'n',
  'number': (v) => `0(${v})`,
  'object': (v) => {
    if (System.isModule(v)) {
      const name = Array.from(System.registry.entries())
        .find(r => r[1] === v)[0]
      return `o(mod ${fromJS(name)})`
    }
    return 'o()'
  },
  'string': (v) => `s(${v.length} ${v})`,
  'undefined': () => 'u',
}

const _just = (x) => (s, i) => [i + 1, x]
const _expectLeftParen = (s, i) => {
  if (s.charAt(++i) !== '(') throw new Error('Expected "("')
  return i + 1
}
const _expectRightParen = (s, i) => {
  if (s.charAt(i++) !== ')') throw new Error('Expected ")"')
  return i
}

const toJSConversions = {
  '0': (s, i) => {
    i = _expectLeftParen(s, i)
    const begin = i
    while (s.charAt(i++) !== ')') ;
    const js = +s.substring(begin, i - 1)
    return [i, js]
  },
  'a': async (s, i) => {
    i = _expectLeftParen(s, i)
    const js = []
    while (s.charAt(i) !== ')') {
      let v
      [i, v] = await _toJS(s, i)
      js.push(v)
    }

    return [i + 1, js]
  },
  'f': _just(false),
  'n': _just(null),
  'o': async (s, i) => {
    i = _expectLeftParen(s, i)
    const begin = i
    while (s.charAt(i++) !== ' ') ;
    const tag = s.substring(begin, i - 1)
    let js = undefined
    if (tag === 'mod') {
      let v
      [i, v] = await _toJS(s, i)
      js = await System.import(System.resolveSync(v))
    }
    i = _expectRightParen(s, i)
    return [i, js]
  },
  's': (s, i) => {
    i = _expectLeftParen(s, i)
    const begin = i
    while (s.charAt(i++) !== ' ') ;
    const length = +s.substring(begin, i - 1)
    const js = s.substr(i, length)
    i = _expectRightParen(s, i + length)
    return [i, js]
  },
  't': _just(true),
  'u': _just(undefined),
}

export const getType = (o) => {
  let t = typeof o
  switch (t) {
  case 'object':
    if (o === null)
      return 'null'

    if (Array.isArray(o))
      return 'array'

    break
  }

  return t
}
