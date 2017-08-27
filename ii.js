#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const SystemJS = require('systemjs')

const __moduleName = 'file://' + __filename
SystemJS.config({baseURL: __dirname})

const jspmConfigFilename = path.resolve(__dirname, './jspm.config.js')
const jspmConfigString = fs.readFileSync(jspmConfigFilename).toString()
eval(jspmConfigString)

require('./systemjs.config')

SystemJS.import('./lib/cli', __moduleName)
