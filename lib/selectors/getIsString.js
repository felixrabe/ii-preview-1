import {createSelector} from 'reselect'

import getData from './getData'

const getIsReadOnly = createSelector(
  [getData],
  (data) => typeof data === 'string',
)

export default getIsReadOnly
