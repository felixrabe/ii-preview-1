const _ = self

_.clearAll = () => { _.clearBody() ; _.clearHead() }

_.clearBody = () => { document.body.innerHTML = '' }

_.clearHead = () => {
  [...document.head.children].forEach((child) =>
    child.tagName === 'STYLE' && document.head.removeChild(child)
  )
}

_.element = (name, ...children) => {
  if (name instanceof Node) return name
  const el = document.createElement(name)
  let fullStyle = ''
  children.forEach((child) => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child))
    } else if (child instanceof HTMLElement) {
      el.appendChild(child)
    } else {
      const {style} = child
      delete child.style
      if (style) fullStyle += style
      Object.keys(child).forEach(k => el.setAttribute(k, child[k]))
    }
  })
  if (fullStyle) el.setAttribute('style', fullStyle)
  return el
}

const styleKey = (k) => {
  if (k.startsWith('data-')) return k
  return k
    .match(/([A-Z]?[^A-Z]+)/g)
    .map(n => n.toLowerCase())
    .join('-')
}

self.style = (style) => {
  let st = ''

  Object.entries(style)
    .map(([k, v]) => st += `${styleKey(k)}: ${v};`)
    .join(' ')

  return {style: st}
}

const appendChild = (el, ...c) =>
  el.appendChild(typeof c[0] === 'string' ? _.element(...c) : c[0])
_.writeBody = (...a) => appendChild(document.body, ...a)
_.writeHead = (...a) => appendChild(document.head, ...a)

_.$$ = document.querySelectorAll.bind(document)
_._ = _.element
_.w = _.writeBody
_.wh = _.writeHead
