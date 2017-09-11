#!/usr/bin/env node

const path = require('path')

const add = require('./commands/add')
const execSync = require('./utils/execSync')
const findToplevelPkgJson = require('./utils/findToplevelPkgJson')
const new_ = require('./commands/new')

const run = (cmd, match) => {
  const rootPkgJson = findToplevelPkgJson()
  const r = cmd(match, rootPkgJson)
  process.chdir(path.dirname(rootPkgJson.loc))
  execSync('yarn', 'install', '--silent', '--no-progress')
  return r
}

const main = () => {
  let match
  const argv = process.argv

  if (match = add.match(argv)) return run(add, match)
  if (match = new_.match(argv)) return run(new_, match)

  throw new Error('invalid command')
}

try {
  main()
} catch (err) {
  console.error(err)
}
