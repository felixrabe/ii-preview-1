import {createSelector} from 'reselect'

import getData from './getData'

const getOriginalText = createSelector(
  [getData],
  (data) => typeof data === 'string' ? data : JSON.stringify(data, null, 2),
)

export default getOriginalText
