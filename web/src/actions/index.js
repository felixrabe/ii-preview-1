import actions from './actions'
import createAction from './createAction'

// asynchronous actions

createAction('load for a sec', async ({dispatch}) => {  // example
  dispatch(actions.setIsLoading(true))
  await new Promise(r => setTimeout(r, 1000))
  dispatch(actions.setIsLoading(false))
})

const loadAfter = 5000

createAction('load path', async ({dispatch, getState}, path) => {
  const pathData = getState().pathData[path] || {}
  if (pathData.isLoading || pathData.loadedAt + loadAfter > Date.now()) return
  dispatch(actions.loadPathRequest(path))

  try {
    const res = await fetch('/_i' + path)
    const data = await res.json()
    dispatch(actions.setPathData(path, data))
  } catch (err) {
    console.error(err)
  }
})

// synchronous actions

createAction('load path request', (path) => ({path}))

createAction('set env',
  ({inBrowser = undefined, inNode = undefined}) => ({inBrowser, inNode})
)
createAction('set is loading', (isLoading) => ({isLoading}))
createAction('set path data', (path, data) => ({path, data}))
createAction('set path is loading', (path, isLoading) => ({path, isLoading}))

export const __useDefault = actions
export default __useDefault
