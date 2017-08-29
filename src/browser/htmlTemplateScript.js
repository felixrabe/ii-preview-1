// included in the browser via ./htmlTemplate.js

(() => {
  'use strict'

  self.IILoader = self.SystemJS
  delete self.System
  delete self.SystemJS

  self.IILoader.import('ii/browser/main').then(main => main())
})()
