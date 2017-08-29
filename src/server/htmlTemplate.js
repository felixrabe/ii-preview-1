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
  <script src="_ii/jspm_packages/system.js"></script>
  <script>SystemJS.config({baseURL: '/_ii'})</script>
  <script src="_ii/jspm.config.js"></script>
  <script src="_ii/src/browser/htmlTemplateScript.js"></script>
</body>
</html>
`

export const __useDefault = htmlTemplate
export default __useDefault
