import D from 'draft-js'

import actions from '../actions/index'

const defaultState = {
  path: [],
  data: {},
  editorState: D.EditorState.createEmpty(),
}

const main = (state = defaultState, action) => {
  switch (action.type) {

  case actions.SET_PATH:
    return {...state, path: action.path}

  case actions.SET_FULL_DATA:
    return {...state, data: action.data}

  case actions.SET_DATA:
    const {key, value} = action
    const newData = {...state.data}
    const data = state.path.reduce(
      (data, p) => (data[p] = {...data[p]}),
      newData,
    )
    data[key] = value
    return {...state, data: newData}

  default:
    return state
  }
}

export default main
