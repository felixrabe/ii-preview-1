const htmlTemplate = ({body}) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>ii</title>
  <base href="/" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="_s/src/core-client/system-font.css" />
  <link rel="stylesheet" href="_s/src/core-client/main.css" />
  <style>
    body.loading {
      pointer-events: none;
      user-select: none;
    }

    #ii-root {
      height: 100%;
      transition: filter 400ms;
    }

    body.loading #ii-root {
      filter: blur(1px);
    }

    #loading-root {
      align-items: center;
      background-color: #d0d8e0;
      color: #507090;
      display: flex;
      font-family: system-ui;
      font-size: 8vw;
      height: 100%;
      justify-content: center;
      left: 0px;
      opacity: 0;
      pointer-events: none;
      position: absolute;
      top: 0px;
      transition: opacity 400ms;
      user-select: none;
      width: 100%;
    }

    body.loading #loading-root {
      opacity: 0.5;
    }
  </style>
</head>
<body class="loading">
  <div id="ii-root">${body || ''}</div>
  <div id="loading-root"><div>Loading...</div></div>
  <script src="_s/jspm_packages/system.js"></script>
  <script>SystemJS.import('/_s/src/core-client/bootstrap.js')</script>
</body>
</html>
`

export default htmlTemplate
