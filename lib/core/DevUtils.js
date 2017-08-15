

let View


const refreshableModules = [
  'lib/data/DataAccess',
  'lib/data/DataRepoBuiltin',
  'lib/data/DataRepoImport',
  'lib/data/DataRepoLocal',
  'lib/view/View',
]

let dataAccess

async function refresh() {
  const deletableModules = refreshableModules
    .map(n => SystemJS.resolveSync(n))
    .concat(
      Array.from(SystemJS.registry.keys())
        .filter(k => k.startsWith('http://localhost:8080/lib/'))
    )

  deletableModules.forEach(n => {
    SystemJS.registry.delete(n)
  })

  return Promise.all(refreshableModules.map(n => SystemJS.import(n)))
    .then(([
      DataAccess_,
      DataRepoBuiltin_,
      DataRepoImport_,
      DataRepoLocal_,
      View_,
    ]) => {
      View = View_.default

      const DataAccess = DataAccess_.default
      const DataRepoBuiltin = DataRepoBuiltin_.default
      const DataRepoImport = DataRepoImport_.default
      const DataRepoLocal = DataRepoLocal_.default

      window.$da = dataAccess = new DataAccess({
        default: 'builtin',
        builtin: new DataRepoBuiltin(),
        import: new DataRepoImport(),
        local: new DataRepoLocal('ii-'),
      })

      SystemJS.config({
        meta: {
          '$$dataAccess$$/*': {
            loader: 'lib/data/DataAccessSystemJSPlugin',
            instadevDataAccess: dataAccess,
            babelOptions: {
              es2015: false,
              plugins: [
                'babel-plugin-transform-react-jsx',
              ],
            },
          },
        },
      })
    })
}
