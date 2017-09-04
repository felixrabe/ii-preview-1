import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'

import Body from '../components/Body'
import createStore from '../createStore'

const renderStatic = (ctx, req) => {
  const store = createStore({inBrowser: false, inNode: true})

  return {body: ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter context={ctx} location={req.url}>
        <Body />
      </StaticRouter>
    </Provider>
  )}
}

export default renderStatic
