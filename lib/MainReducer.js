const mainReducer = (state = {lastId: 0, list: []}, action) => {
  switch (action.type) {
  case 'add':
    const id = state.lastId + 1
    return Object.assign({}, state, {
      lastId: id,
      list: [...state.list, {
        id: id,
        text: action.text || `Item ${id}`,
      }],
    })
  case 'remove':
    return Object.assign({}, state, {
      list: state.list.filter(i => i.id !== action.id),
    })
  default:
    return state
  }
}

export default mainReducer
