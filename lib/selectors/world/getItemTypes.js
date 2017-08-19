import _ from 'lodash'
import {createSelector} from 'reselect'

export default createSelector(
  state => state.items,
  (items) => _.uniq(_.map(items, item => item.type)),
)
