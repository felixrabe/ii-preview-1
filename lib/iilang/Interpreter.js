import _ from 'lodash'

import actions from '../actions/index'

const typeOf = s => {
  if (s.startsWith(',')) {
    return 'command'
  }
  switch (JSON.stringify([_.lowerFirst(s) === s, _.upperFirst(s) === s])) {
  case '[true,false]':
    return 'lower'
  case '[false,true]':
    return 'upper'
  }
  return 'unknown'
}

class Matcher {
  constructor(text) {
    this.words = text.trim().split(/\s+/)
    this.length = this.words.length

    this.command = this.words.map(w => typeOf(w) === 'command')
    this.lower = this.words.map(w => typeOf(w) === 'lower')
    this.upper = this.words.map(w => typeOf(w) === 'upper')
  }

  matchFn = (p, i) => this[p][i]

  match(pattern) {
    const pp = []
    let expand = -1
    pattern.trim().split(/\s+/).forEach((p, i) => {
      if (p.endsWith('+')) {
        if (expand !== -1) {
          throw new Error('Illegal pattern')
        }
        p = p.slice(0, -1)
        expand = i
      }
      pp.push(p)
    })

    if (expand === -1) {
      if (pp.length !== this.length) {
        return false
      }
      return pp.every(this.matchFn)
    } else {
      if (pp.length > this.length) {
        return false
      }
      // example: expand === 1, pp.length === 4, this.length === 6
      // pp:           0  1+  2 3
      // this.words:   0  123 4 5
      const endOffset = this.length - pp.length
      const endBegin = endOffset + expand + 1
      if (!pp.slice(0, expand).every(this.matchFn)) {
        return false
      }
      if (!this[pp[expand]].slice(expand, endBegin).every(x => x)) {
        return false
      }
      return pp.slice(expand + 1).every((p, i) => this[p][i + endOffset])
    }
  }
}

export default class Interpreter {
  constructor(state, dispatch) {
    this.state = state
    this.dispatch = dispatch
  }

  interpret(text) {
    const m = new Matcher(text)

    if (m.match('upper lower+')) {
      return this.dispatch(actions.updateItems(_.fromPairs(
        m.words.slice(1).map(w => ([w, {type: m.words[0]}]))
      )))
    }

    if (m.match('command lower+')) {
      if (m.length === 3) {
        switch (m.words[0]) {
        // ,rename foo bar
        case ',rename':
          return this.dispatch(actions.renameItem(m.words[1], m.words[2]))
        }
      }
      switch (m.words[0]) {
      // ,rm one two three
      case ',rm':
        return this.dispatch(actions.removeItems(m.words.slice(1)))
      }
    }

    if (m.match('lower command lower')) {
      switch (m.words[1]) {
      // code ,exec result
      case ',exec':
        return this.dispatch(actions.execute(m.words[0], m.words[2]))
      }
    }
  }
}
