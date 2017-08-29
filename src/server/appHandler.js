import React from '@node/react'
import ReactDOMServer from '@node/react-dom/server'
import { StaticRouter } from '@node/react-router'

import htmlTemplate from './htmlTemplate'
import AppRoot from './reactComponents/AppRoot'
import IIRoot from './reactComponents/IIRoot'

const appHandler = (req, res) => {
  const context = {}

  const appBody = ReactDOMServer.renderToString(
    <StaticRouter context={context} location={req.url}>
      <AppRoot />
    </StaticRouter>
  )

  const iiBody = ReactDOMServer.renderToString(
    <StaticRouter context={{}}>
      <IIRoot />
    </StaticRouter>
  )

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    })
  } else {
    res.write(htmlTemplate({appBody, iiBody}))
  }
  res.end()
}

export const __useDefault = appHandler
export default __useDefault
