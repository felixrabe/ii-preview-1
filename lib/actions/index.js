import fetch from 'isomorphic-fetch'

import actions from './actions'
export {default} from './actions'

import createAction from './createAction'

createAction('add world', (name) => ({name}))
createAction('fetch url', async (dispatch, url) => {
  dispatch(actions.fetchUrlOpen(url))
  const response = await fetch(url)
  const contentType = response.headers.get('Content-Type').split(';', 1)[0]
  let result
  if (contentType === 'application/json') {
    result = await response.json()
  } else {
    result = await response.text()
  }
  return dispatch(actions.fetchUrlResult(url, result))
})
createAction('fetch url open', (url) => ({url}))
createAction('fetch url result', (url, result) => ({url, result}))
createAction('load', () => ({}))
