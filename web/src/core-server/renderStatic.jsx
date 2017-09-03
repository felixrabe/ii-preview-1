import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'

import Body from '../components/Body'

const renderStatic = (ctx, req) => {
  return {body: ReactDOMServer.renderToString(
    <StaticRouter context={ctx}><Body loading /></StaticRouter>
  )}
}

export default renderStatic
