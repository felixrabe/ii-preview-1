#!/usr/bin/env node

const path = require('path')

const cwd = process.cwd()
console.log(cwd)
console.log('wrong:', path.resolve('.'))
console.log('correct:', path.resolve(cwd, '.'))
