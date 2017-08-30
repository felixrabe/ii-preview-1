const htmlTemplate = ({appBody, iiBody}) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>ii</title>
  <base href="/" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="_ii/src/browser/main.css" />
  <style>
    #app-root {
      height: 100%;
      overflow: auto;
    }
  </style>
</head>
<body>
  <div id="app-root">${appBody || ''}</div>
  <div id="ii-root">${iiBody || ''}</div>
  <script src="_ii/jspm_packages/system.js"></script>
  <script>SystemJS.config({baseURL: '/_ii'})</script>
  <script src="_ii/jspm.config.js"></script>
  <script>
    (() => {
      'use strict'

      self.IILoader = self.SystemJS
      delete self.System
      delete self.SystemJS

      self.IILoader.import('ii/browser/main').then(main => main())
    })()
  </script>
</body>
</html>
`

export const __useDefault = htmlTemplate
export default __useDefault
