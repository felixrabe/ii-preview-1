import {createSelector} from 'reselect'

import getData from './getData'
import getIsString from './getIsString'

const getOriginalText = createSelector(
  [getData, getIsString],
  (data, isString) => isString ? data : JSON.stringify(data, null, 2),
)

export default getOriginalText
