(async () => {
  'use strict'

  try {
    SystemJS.config({baseURL: '/_s'})
    await SystemJS.import('jspm.config.js')
    const main = await SystemJS.import('ii/core-client/main')
    main({self})
  } catch (err) {
    console.error(err)
  }
})()
