#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const SystemJS = require('systemjs')

SystemJS.config({baseURL: __dirname})

const jspmConfigFilename = path.resolve(__dirname, './jspm.config.js')
const jspmConfigString = fs.readFileSync(jspmConfigFilename).toString()
eval(jspmConfigString)

SystemJS.import('ii/cli')
