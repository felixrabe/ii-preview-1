import * as Redux from 'redux'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'

import mainReducerFactory from './reducers/main'

const createStore = (initialState = {}) => (
  Redux.createStore(
    mainReducerFactory(initialState),
    Redux.applyMiddleware(
      reduxThunk,
      // reduxLogger,
    ),
  )
)

export const __useDefault = createStore
export default __useDefault
