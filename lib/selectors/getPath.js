import {createSelector} from 'reselect'

const getPath = createSelector(
  [state => state.path],
  (path) => path,
)

export default getPath
