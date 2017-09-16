#!/usr/bin/env node

console.log('hello...')
require('./othermod')

// const multipipe = require('multipipe')
// const streams = require('ii-streams')

console.log('JS to JSON converter')
process.stdin.pipe(process.stdout)

// process.stdin.pipe(multipipe([
//   new streams.ExecTransform(),
//   new streams.ObjToJSONTransform(),
// ])).pipe(process.stdout)

return new Promise(r => setTimeout(r, 3000))
