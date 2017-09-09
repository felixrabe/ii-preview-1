#!/usr/bin/env node

const path = require('path')

const main = async () => {
  const SystemJS = require('systemjs')
  SystemJS.config({baseURL: 'file://' + __dirname})
  await SystemJS.import(path.join(__dirname, 'jspm.config.js'))
  await SystemJS.import(path.join(__dirname, 'systemjs.config.js'))
  ;(await SystemJS.import('ii-1/daemon/main'))()
}

main().catch(err => console.error(err))
