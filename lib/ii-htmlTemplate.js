const htmlTemplate = ({appBody, iiBody}) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>ii</title>
  <base href="/" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>html { font-size: 16px; }</style>
</head>
<body>
  <div id="app-root">${appBody || ''}</div>
  <div id="ii-root">${iiBody || ''}</div>
  <script src="_ii/node_modules/systemjs/dist/system.src.js"></script>
  <script>SystemJS.config({baseURL: '/_ii'})</script>
  <script src="_ii/jspm.config.js"></script>
  <script src="_ii/systemjs.config.js"></script>
  <script>
    self.IISystemJS = SystemJS
    delete self.System
    delete self.SystemJS
    Promise.resolve()
      .then(() => {
        return IISystemJS.import('utils/all')
      })
      .then((u) => {
        (self.u = u).extend({Promise, IISystemJS})
        return IISystemJS.import('lib/ii-reloader')
      })
      .then((reloader) => {
        (self.u.reloader = reloader).render()
        return IISystemJS.import('lib/ii-react-ui')
      })
      .then((ui) => {
        (self.u.ui = ui).render()
        console.log('React done')
      })
  </script>
</body>
</html>
`

export const __useDefault = htmlTemplate
export default __useDefault
