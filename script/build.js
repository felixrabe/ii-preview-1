#!/usr/bin/env node

const childProcess = require('child_process')
const path = require('path')

process.chdir(path.join(__dirname, '..', 'go-client', 'ii-1'))
childProcess.spawnSync('go', ['build'], {
  encoding: 'utf-8',
  stdio: 'inherit',
})
