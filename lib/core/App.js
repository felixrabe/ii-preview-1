import React from 'react'
import PropTypes from 'prop-types'

import {style} from './ui/style/CSS'
import AsyncStorage from './storage/AsyncStorage'
import Scope from './Scope'
import Layout from './Layout'

import CommandLine from './cmd/CommandLine'
import CommandRunner from './cmd/CommandRunner'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.storage = new AsyncStorage(localStorage, '$$instadev$$')

    this.state = {
      canAnimate: false,
      scope: new Scope({
        objs: {app: this, React: React},
        onChange: (scope) => this.setState({scope}),
        storage: this.storage,
      }),
      style: style,
    }
  }

  componentDidMount() {
    const runner = new CommandRunner(this.state.scope)
    const cmdLine = <CommandLine onReturn={runner.run} />
    this.state.scope.set('cmdLine', cmdLine, {constant: true})
    setTimeout(() => this.setState({canAnimate: true}), 500)
  }

  reloadStyle = async () => {
    const [vars, css] = ['lib/core/ui/style/Vars', 'lib/core/ui/style/CSS']
    await this.state.scope._import(vars)
    const newStyle = await this.state.scope._import(css, 'style')
    this.setState({style: newStyle})
  }

  getChildContext = () => {
    return { storage: this.storage }
  }

  render() {
    const addClassName = this.state.canAnimate ? '' : ' core-animate-none'
    return (
      <div className={`core-app${addClassName}`}>
        <style>{this.state.style}</style>
        <Layout>
          {this.state.scope.renderObjsForLayout()}
        </Layout>
      </div>
    )
  }

  _reactRepr = () => (
    <div className='core-padding'><em>Main application object</em></div>
  )
}

App.childContextTypes = {
  storage: PropTypes.object.isRequired,
}
