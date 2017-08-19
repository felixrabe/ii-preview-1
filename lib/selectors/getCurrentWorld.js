import {createSelector} from 'reselect'

export default createSelector(
  state => state.currentWorld,
  state => state.worlds[state.currentWorld],
  (name, curWorld) => ({...curWorld, name}),
)
