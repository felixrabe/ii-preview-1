import {createSelector} from 'reselect'

import getModifiedEditor from './getModifiedEditor'
import getPathStr from './getPathStr'

const getIsReadOnly = createSelector(
  [getPathStr, getModifiedEditor],
  (pathStr, modifiedEditor) => (
    modifiedEditor !== null && modifiedEditor !== pathStr
  ),
)

export default getIsReadOnly
