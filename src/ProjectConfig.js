import changeDir from './ProjectConfig/changeDir'
import directoryExists from './ProjectConfig/directoryExists'
import gitIgnore from './ProjectConfig/gitIgnore'
import gitRepository from './ProjectConfig/gitRepository'
import jspmConfig from './ProjectConfig/jspmConfig'
import jspmInstalled from './ProjectConfig/jspmInstalled'
import jsxEnabled from './ProjectConfig/jsxEnabled'
import nodeModules from './ProjectConfig/nodeModules'
import packageJson from './ProjectConfig/packageJson'
import packageJsonIIConfig from './ProjectConfig/packageJsonIIConfig'
import reactInstalled from './ProjectConfig/reactInstalled'
import writeJspmConfig from './ProjectConfig/writeJspmConfig'
import writePackageJson from './ProjectConfig/writePackageJson'

const howtoInit = 'Run \'ii init\' to initialize a project.'

const init = (cfg, ctx) => {
  [
    directoryExists,
    packageJson,
    changeDir,  // packageJson() might have changed cfg.dir
    packageJsonIIConfig,
    writePackageJson,
    nodeModules,
    jspmInstalled,
    jspmConfig,
    packageJson,  // reload
    reactInstalled,
    jsxEnabled,
    writeJspmConfig,
    gitIgnore,
    gitRepository,
  ].forEach(module => module(cfg, ctx))
}

class ProjectConfig {
  constructor({dir, onMissingConfig} = {}) {
    this.dir = dir

    const ctx = {
      onMissingConfig: ({create, message}) => {
        onMissingConfig({
          message: `${message}\n${howtoInit}`,
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
