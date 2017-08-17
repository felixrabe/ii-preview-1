import React from 'react'
import PropTypes from 'prop-types'

let View

window.thenlog = (x) => (x.then(y => console.log(y)), undefined)
window.thenlet = (n, x) => (x.then(y => window[n] = y), undefined)

const refreshableModules = [
  'lib/store/Store',
  'lib/store/DataRepoBuiltin',
  'lib/store/DataRepoImport',
  'lib/store/DataRepoLocal',
  'lib/view/View',
]

let store

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
      Store_,
      DataRepoBuiltin_,
      DataRepoImport_,
      DataRepoLocal_,
      View_,
    ]) => {
      View = View_.default

      const Store = Store_.default
      const DataRepoBuiltin = DataRepoBuiltin_.default
      const DataRepoImport = DataRepoImport_.default
      const DataRepoLocal = DataRepoLocal_.default

      window.$da = store = new Store({
        default: 'builtin',
        builtin: new DataRepoBuiltin(),
        import: new DataRepoImport(),
        local: new DataRepoLocal('ii-'),
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
    })
}

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      defaultViewPathLoaded: false,
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

  loadDefaultViewPath = async () => {
    const viewPath = await store.get('local:view/defaultPath')
    if (viewPath !== undefined) {
      this.setState({viewPath})
    }

    this.setState({defaultViewPathLoaded: true})
  }

  doRefresh = async () => {
    await refresh()
    if (!this.state.defaultViewPathLoaded) {
      await this.loadDefaultViewPath()
    }

    this.setState({refresh: false})
  }

  refresh() {
    this.setState({refresh: true})
  }

  getChildContext() {
    return { store }
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
  viewPath: 'devbar',
}

App.childContextTypes = {
  store: PropTypes.object,
}
