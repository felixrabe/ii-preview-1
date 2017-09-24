#!/usr/bin/env node

const multipipe = require('multipipe')

const streams = require('ii-streams')

process.stdout.write('JS to JSON converter - you got 2s before timeout:\n')

process.stdin.pipe(multipipe([
  new streams.ExecTransform(),
  new streams.ObjToJSONTransform(),
])).pipe(process.stdout)

return new Promise(r => setTimeout(() => {
  process.stdin.end()
  r()
}, 2000))
