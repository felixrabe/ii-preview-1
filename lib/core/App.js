import React from 'react'
import PropTypes from 'prop-types'

import DataAccess from '../data/DataAccess'
import DataRepoBuiltin from '../data/DataRepoBuiltin'
import DataRepoImport from '../data/DataRepoImport'
import DataRepoLocal from '../data/DataRepoLocal'

import View from '../view/View'

const dataAccess = new DataAccess({
  default: 'builtin',
  builtin: new DataRepoBuiltin(),
  import: new DataRepoImport(),
  local: new DataRepoLocal('$$instadev$$'),
})

window.$da = dataAccess

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

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      viewPath: this.props.viewPath,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({viewPath: nextProps.viewPath})
  }

  getChildContext() {
    return { dataAccess }
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <style>{'html { font-size: 16px; }'}</style>
        <View path={this.state.viewPath} />
      </div>
    )
  }
}

App.defaultProps = {
  viewPath: 'plainView',
}

App.childContextTypes = {
  dataAccess: PropTypes.object.isRequired,
}
