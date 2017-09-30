const fs = require('fs')
const mkdirp = require('mkdirp')
const {resolve} = require('path')
const util = require('util')

const build = require('ii-build')
const babelTransform = require('./babelTransform')

const mkdir = util.promisify(mkdirp)
const readdir = util.promisify(fs.readdir)
const stat = util.promisify(fs.stat)

const transformFile = async (srcDir, buildDir, filename) => {
  const [s, b] = [srcDir, buildDir].map(d => resolve(d, filename))
  console.log(`  ${s} => ${b}`)
  await babelTransform(s, b)
}

const transformDir = (srcDir, buildDir) => {
  console.log(`${srcDir} -> ${buildDir}`)
  return readdir(srcDir)
    .then((entries) => Promise.all( entries.sort().map(async (entry) => {
      const sd = resolve(srcDir, entry)
      const sdStat = await stat(sd)
      if (sdStat.isDirectory()) {
        const bd = resolve(buildDir, entry)
        await mkdir(bd)
        await transformDir(sd, bd)
      } else {
        await transformFile(srcDir, buildDir, entry)
      }
    }) ))
}

module.exports = build(__dirname,
  ({srcDir, buildDir}) => transformDir(srcDir, buildDir)
)
