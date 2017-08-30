import jspm from '@node/jspm'
import jspmUi from '@node/jspm/lib/ui'

import log from '../utils/log'
import commit from './commit'

// const answers = {
//   // 'Install the peer %react% from `16.0.0-beta.5` -> `^15.0.0`?': false,
//   // 'Install the peer %react-dom% from `next` -> `^15.0.0`?': false,
//   // 'Install the peer %react% from `^16.0.0-beta.5` -> `^15.0.0`?': false,
// }

// jspm.on('log', (type, msg) => {
//   if (type === 'debug' || type === 'ok') return
//   console.log('log:', type, msg)
// })
// jspm.on('prompt', (prompt, callback_) => {
//   console.log('prompt:', prompt)
//   const callback = (r) => {
//     console.log('=>', r)
//     callback_(r)
//   }
//   if (prompt.message in answers) {
//     callback(answers[prompt.message])
//   } else {
//     callback(prompt.default)
//   }
// });
// jspmUi.useDefaults(false)

jspmUi.setResolver()
jspmUi.useDefaults(false)

const override = {peerDependencies: {react: '>16.0.0-beta'}}

const jspmInstall = async (name, target, options) => {
  log(`jspm install ${name}=${target}  ${JSON.stringify(options)}`)
  await jspm.install(name, target, options)
}

const deps = {
  'react-grid-layout': [
    'react-resizable',
  ],
}

const _resolveDeps = (d, pkg) => {
  return (deps[pkg] || []).reduce(_resolveDeps, d).concat(pkg)
}

const resolveDeps = (pkg) => _resolveDeps([], pkg)

const handlePkg = async (pkg) => {
  const deps = resolveDeps(pkg)
  for (let i = 0; i < deps.length; i++) {
    const pkg = deps[i]
    await jspmInstall(pkg, `npm:${pkg}`, {override})
  }
}

const install = async (dir, pkg) => {
  try {
    await commit(dir, 'pre install')
  } catch (err) { /* ignore */ }
  await handlePkg(pkg)
  await commit(dir, `install ${pkg}`)
}

export const __useDefault = install
export default __useDefault
