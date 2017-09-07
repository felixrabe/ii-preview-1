#!/usr/bin/env node

const main = async () => {
  const SystemJS = require('systemjs')
  await SystemJS.import('jspm.config.js')
  await SystemJS.import('systemjs.config.js')
  await SystemJS.import('ii-1/daemon')
}

main().catch(err => console.error(err))
