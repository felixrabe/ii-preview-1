import React from 'react'
import PropTypes from 'prop-types'

let View

window.thenlog = (x) => x.then(y => console.log(y))

const refreshableModules = [
  'lib/data/DataAccess',
  'lib/data/DataRepoBuiltin',
  'lib/data/DataRepoImport',
  'lib/data/DataRepoLocal',
  'lib/view/View',
]

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

      window.$da = new DataAccess({
        default: 'builtin',
        builtin: new DataRepoBuiltin(),
        import: new DataRepoImport(),
        local: new DataRepoLocal('$$instadev$$'),
      })

      SystemJS.config({
        meta: {
          '$$dataAccess$$/*': {
            loader: 'lib/data/DataAccessSystemJSPlugin',
            instadevDataAccess: window.$da,
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

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      refresh: true,
      viewPath: this.props.viewPath,
    }
  }

  componentDidMount() {
    this.doRefresh()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({viewPath: nextProps.viewPath})
  }

  componentDidUpdate() {
    if (this.state.refresh) {
      this.doRefresh()
    }
  }

  doRefresh() {
    refresh().then(() => {
      this.setState({refresh: false})
    })
  }

  getChildContext() {
    return { dataAccess: window.$da }
  }

  render() {
    if (this.state.refresh) {
      return <div />
    }

    return (
      <div style={{height: '100%'}}>
        <style>{'html { font-size: 16px; }'}</style>
        <View path={this.state.viewPath} />
      </div>
    )
  }
}

App.defaultProps = {
  viewPath: 'navigator',
}

App.childContextTypes = {
  dataAccess: PropTypes.object,
}
