#!/usr/bin/env node

process.stdout.write('Echo - you got 2s before timeout:\n')

process.stdin.pipe(process.stdout)

return new Promise(r => setTimeout(() => {
  process.stdin.end()
  r()
}, 2000))
