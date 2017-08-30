const AppLoader = new SystemJS.constructor()

AppLoader._configured = (async () => {
  const sysCfg = SystemJS.getConfig()
  const iiPkgUrl = SystemJS.resolveSync('ii').replace(/\/[^/]+$/, '')
  const iiPkg = sysCfg.packages[iiPkgUrl]
  AppLoader.config({
    paths: {
      'ii/': sysCfg.baseURL + sysCfg.paths['ii/'],
    },
    packages: {
      ii: iiPkg,
    },
  })

  await AppLoader.import('/jspm.config.js')
})()

export const __useDefault = AppLoader
export default __useDefault
