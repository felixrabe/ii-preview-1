import directoryExists from './ProjectConfig/directoryExists'
import gitIgnore from './ProjectConfig/gitIgnore'
import gitRepository from './ProjectConfig/gitRepository'
import jspmConfig from './ProjectConfig/jspmConfig'
import jspmInstalled from './ProjectConfig/jspmInstalled'
import nodeModules from './ProjectConfig/nodeModules'
import packageJson from './ProjectConfig/packageJson'
import packageJsonIIConfig from './ProjectConfig/packageJsonIIConfig'
import writePackageJson from './ProjectConfig/writePackageJson'

const howtoInit = 'Run \'ii init\' to initialize a project.'

const init = (cfg, ctx) => {
  directoryExists(cfg, ctx)
  packageJson(cfg, ctx)
  process.chdir(cfg.dir)  // packageJson() might have changed cfg.dir
  packageJsonIIConfig(cfg, ctx)
  writePackageJson(cfg, ctx)
  nodeModules(cfg, ctx)
  jspmInstalled(cfg, ctx)
  jspmConfig(cfg, ctx)
  gitIgnore(cfg, ctx)
  gitRepository(cfg, ctx)
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
