import {createSelector} from 'reselect'

const getDir = createSelector(
  [state => state.path, state => state.data],
  (path, data) => {
    console.log('getDir 1:', path, data)
    const obj = path.reduce((data, p) => data[p], data)
    console.log('getDir 2:', obj)
    return obj && typeof obj === 'object' ? Object.keys(obj).sort() : []
  },
)

export default getDir
