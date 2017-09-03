import actions from '../actions/index'

const defaultState = {
  isLoading: true,
  pathData: {},
  server: false,
}

const mainReducerFactory = (initialState = {}) => {
  const defState = Object.assign({}, defaultState, initialState)
  let main
  return main = (s = defState, a) => {
    switch (a.type) {
      case actions.LOAD_PATH_REQUEST:
        s = {...s, pathData: {...s.pathData, [a.path]: {
          ...(s.pathData[a.path] || {}),
          isLoading: true,
        }}}
        break
      case actions.SET_IS_LOADING:
        s = {...s, isLoading: a.isLoading}
        break
      case actions.SET_PATH_DATA:
        s = {...s, pathData: {...s.pathData, [a.path]: {
          ...(s.pathData[a.path] || {}),
          data: a.data,
          loadedAt: Date.now(),
          isLoading: false,
        }}}
        break
      case actions.SET_PATH_IS_LOADING:
        s = {...s, pathData: {...s.pathData, [a.path]: {
          ...(s.pathData[a.path] || {}),
          isLoading: a.isLoading,
        }}}
        break
    }
    return s
  }
}

export const __useDefault = mainReducerFactory
export default __useDefault
