const configureSystemJS = async (SystemJS) => {
  SystemJS.config({baseURL: '/_s'})
  await SystemJS.import('jspm.config.js')
  return SystemJS
}

const reload = async ({nested = false} = {}) => {
  if (!nested) {
    SystemJS.registry.delete(__moduleName)
    const reload = await SystemJS.import(__moduleName)
    return reload({nested: true})
  }
  console.clear()
  console.group('reload')
  try {
    const prefix = SystemJS.resolveSync('ii')
    ;([...SystemJS.registry.keys()])
      .filter(key => key.startsWith(prefix))
      .forEach(key => SystemJS.registry.delete(key))

    const mPath = SystemJS.resolveSync('../core-client/main.js', __moduleName)
    const main = await SystemJS.import(mPath)
    main({self, isReloading: true})
  } catch (err) {
    console.error(err)
  }
  console.groupEnd()
}

export const __useDefault = reload
export default __useDefault
