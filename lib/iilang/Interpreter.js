import _ from 'lodash'

import actions from '../actions/index'

const typeOf = s => {
  switch (JSON.stringify([_.lowerFirst(s) === s, _.upperFirst(s) === s])) {
  case '[true,false]':
    return 'lower'
  case '[false,true]':
    return 'upper'
  }
  return 'special'
}

export default class Interpreter {
  constructor(state, dispatch) {
    this.state = state
    this.dispatch = dispatch
  }

  interpret(text) {
    const words = text.trim().split(/\s+/)

    const lower = words.map(w => typeOf(w) === 'lower')
    const special = words.map(w => typeOf(w) === 'special')
    const upper = words.map(w => typeOf(w) === 'upper')

    // Text one two three
    if (upper[0] && _.every(lower.slice(1))) {
      return this.dispatch(actions.updateItems(_.fromPairs(
        words.slice(1).map(w => ([w, {type: words[0]}]))
      )))
    }

    if (special[0] && _.every(lower.slice(1))) {
      switch (words[0]) {
      // ,rm one two three
      case ',rm':
        return this.dispatch(actions.removeItems(words.slice(1)))
      }
    }
  }
}
