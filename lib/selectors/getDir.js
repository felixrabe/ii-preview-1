import {createSelector} from 'reselect'

const getDir = createSelector(
  [state => state.path, state => state.data],
  (path, data) => {
    const obj = path.reduce((data, p) => data[p], data)
    return obj && typeof obj === 'object' ? Object.keys(obj).sort() : []
  },
)

export default getDir
