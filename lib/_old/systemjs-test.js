import Store from './store/Store'
// import DataRepoBuiltin from './store/DataRepoBuiltin'
import DataRepoImport from './store/DataRepoImport'
// import DataRepoLocal from './store/DataRepoLocal'

import DataRepo from './store/DataRepo'

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

const store = new Store({
  default: 'builtin',
  builtin: new DataRepoBuiltin(),
  import: new DataRepoImport(),
  // local: new DataRepoLocal('ii-'),
})

SystemJS.config({
  meta: {
    'ii-store/*': {
      loader: 'lib/store/StoreSystemJSPlugin',
      instadevStore: store,
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
  const m = await SystemJS.import('ii-store/CustomView')
  console.log(m.default)
}

main()
