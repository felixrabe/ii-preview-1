import appRoot from './appRoot'
import changeDir from './changeDir'
import cssLoaderInstalled from './cssLoaderInstalled'
import directoryExists from './directoryExists'
import gitIgnore from './gitIgnore'
import gitRepository from './gitRepository'
import jspmConfig from './jspmConfig'
import jspmInstalled from './jspmInstalled'
import jsxEnabled from './jsxEnabled'
import nodeModules from './nodeModules'
import packageJson from './packageJson'
import packageJsonIIConfig from './packageJsonIIConfig'
import reactInstalled from './reactInstalled'
import writeJspmConfig from './writeJspmConfig'
import writePackageJson from './writePackageJson'

const howtoInit = 'Run \'ii init\' to initialize a project.'

const init = (cfg, ctx) => {
  [
    directoryExists,
    packageJson,
    changeDir,  // packageJson() might have changed cfg.dir
    packageJsonIIConfig,
    writePackageJson,
    appRoot,
    nodeModules,
    jspmInstalled,
    jspmConfig,
    packageJson,  // reload
    cssLoaderInstalled,
    writeJspmConfig,
    reactInstalled,
    jsxEnabled,
    writeJspmConfig,
    gitIgnore,
    gitRepository,
  ].forEach(module => module(cfg, ctx))
}

class ProjectConfig {
  constructor({dir, onMissingConfig, noHowToInitMsg} = {}) {
    this.dir = dir

    const ctx = {
      onMissingConfig: ({create, message}) => {
        onMissingConfig({
          message: noHowToInitMsg ? message : `${message}\n${howtoInit}`,
          create: ({log, ...opts}) => {
            // log(message)
            create({log, ...opts})
          },
        })
      },
    }

    init(this, ctx)
  }
}

export const __useDefault = ProjectConfig
export default __useDefault
