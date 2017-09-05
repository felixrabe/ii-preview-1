#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const SystemJS = require('systemjs')

const main = async () => {
  // SystemJS.config({baseURL: __dirname})
  await SystemJS.import('jspm.config.js')
  await SystemJS.import('systemjs.config.js')
  await SystemJS.import('ii-1/daemon')
}

main().catch(err => console.error(err))
