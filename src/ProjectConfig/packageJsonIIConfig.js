const packageJsonIIConfig = (cfg, {onMissingConfig}) => {
  if (!cfg.packageJson.ii) {
    onMissingConfig({
      message: `package.json at '${cfg.dir}' is missing 'ii' configuration.`,
      create: ({log}) => {
        cfg._needWritePackageJson = true
        log('Creating ii configuration...')
        cfg.packageJson.ii = {}
      },
    })
  }
}

export const __useDefault = packageJsonIIConfig
export default __useDefault
