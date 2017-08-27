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
  <script src="node_modules/systemjs/dist/system.src.js"></script>
  <script src="jspm.config.js"></script>
  <script src="systemjs.config.js"></script>
</body>
</html>
`

export const __useDefault = htmlTemplate
export default __useDefault
