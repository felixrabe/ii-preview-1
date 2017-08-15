import DataAccess from './data/DataAccess'
// import DataRepoBuiltin from './data/DataRepoBuiltin'
import DataRepoImport from './data/DataRepoImport'
// import DataRepoLocal from './data/DataRepoLocal'

import DataRepo from './data/DataRepo'

class DataRepoBuiltin extends DataRepo {
  async get(path) {
    return ({
      'CustomView': `
        import React from 'react'

        export default class CustomView extends React.Component {
          render() {
            return (
              <div>
                Custom View!!!
              </div>
            )
          }
        }
      `,
    })[path]
  }
}

const dataAccess = new DataAccess({
  default: 'builtin',
  builtin: new DataRepoBuiltin(),
  import: new DataRepoImport(),
  // local: new DataRepoLocal('ii-'),
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

async function main() {
  const m = await SystemJS.import('$$dataAccess$$/CustomView')
  console.log(m.default)
}

main()
