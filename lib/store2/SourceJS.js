import {join, split} from './Path'
import Source from './Source'

const method = (mName, cbs) => async function(pp, aa = [], ctx = this.data) {
  if (ctx instanceof Source) {
    return ctx[mName](pp, aa)
  }
  const [p, ...ppp] = pp
  const ctxIsObj = ctx && typeof ctx === 'object'
  const cb = cbs[pp.length]
  if (cb !== undefined) {
    return cb(this, p, ctx, ctxIsObj, aa)
  } else {
    return ctxIsObj ? this[mName](ppp, aa, ctx[p]) : undefined
  }
}

export default class SourceJS extends Source {
  constructor(data) {
    super()
    this.data = data
  }

  delete = method('delete', [
    (t) => {t.data = undefined},
    (t, p, c, isObj) => isObj ? (delete c[p]) : undefined,
  ])

  dir = method('dir', [
    (t, p, c, isObj) => isObj ? Object.keys(c).sort() : [],
  ])

  get = method('get', [
    (t, p, c) => c,
    (t, p, c, isObj) => isObj ? c[p] : undefined,
  ])

  set = method('set', [
    (t, p, c, isObj, aa) => {t.data = aa[0]},
    (t, p, c, isObj, aa) => {isObj && (c[p] = aa[0])},
  ])
}
