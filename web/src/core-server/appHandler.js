import htmlTemplate from './htmlTemplate'
import renderStatic from './renderStatic'

const appHandler = (req, res) => {
  const context = {}

  const rendered = renderStatic(context, req)

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    })
  } else {
    res.write(htmlTemplate(rendered))
  }
  res.end()
}

export default appHandler
