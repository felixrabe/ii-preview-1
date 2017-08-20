import {createSelector} from 'reselect'

import world from '../reducers/world'

export default createSelector(
  (state, props) => props.item.name,
  (state, props) => (
    state.worlds[props.item.name] || world(undefined, {})
  ),
  (name, selWorld) => ({...selWorld, name}),
)
