import {createSelector} from 'reselect'

const getData = createSelector(
  [state => state.path, state => state.data],
  (path, data) => path.reduce((data, p) => data[p], data),
)

export default getData
