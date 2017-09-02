#!/usr/bin/env node

const childProcess = require('child_process')
const path = require('path')

const chdir = (...args) => {
  process.chdir(path.join(__dirname, '..', ...args))
}

const execSync = (...args) => {
  childProcess.spawnSync(args[0], args.slice(1), {
    encoding: 'utf-8',
    stdio: 'inherit',
  })
}

chdir('go-client', 'ii-1')
execSync('go', 'build')
chdir('web')
execSync('yarn')
execSync('yarn', 'jspm', '--', 'install')
