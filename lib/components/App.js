import D from 'draft-js'
import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'

import actions from '../actions/index'
import JSRunner from '../jsexec/JSRunner'
import JSScope from '../jsexec/JSScope'

import {styleCSS} from './Style'

const reload = () => {
  console.clear()

  const deletableModules = Array.from(SystemJS.registry.keys())
    .filter(k => k.startsWith('http://localhost:8080/lib/'))
  deletableModules.forEach(n => SystemJS.registry.delete(n))

  ReactDOM.render(<div />, document.getElementById('root'))

  console.log('ii loading...')
  SystemJS.import('ii').then(ii => {
    ii._run()
    console.log('ii ready')
  })
}

const NavLink = ({children, isActive, onClick, onClickDelete}) => (
  <li>{isActive
    ? <strong>{children}</strong>
    : [
        <a href='#' key='go' onClick={preventDefaultThen(onClick)}>
          {children}
        </a>,
        '\u2009',
        <a href='#' key='rm' onClick={preventDefaultThen(onClickDelete)}>
          (-)
        </a>,
      ]
  }{'\u2002'}</li>
)

const Nav = ({onClickCreate, onClickNavLink, onClickNavLinkDelete, state}) => (
  <nav>
    <ul>
      {
        Object.keys(state.worlds).sort().map(name => (
          <NavLink
            isActive={name === state.activeWorld}
            key={name}
            onClick={() => onClickNavLink(name)}
            onClickDelete={() => onClickNavLinkDelete(name)}
          >
            {name}
          </NavLink>
        ))
      }
      <li><a href='#' onClick={preventDefaultThen(() => {
        const name = prompt('Enter name')
        if (name) {
          onClickCreate(name)
        }
      })}>(+)</a></li>
      <li><a href='#' onClick={preventDefaultThen(reload)}>(R)</a></li>
    </ul>
  </nav>
)

const preventDefaultThen = (cb) => (ev) => {
  ev.preventDefault()
  cb()
}

const ViewError = ({err, view}) => (
  <pre>
    <span style={{color: 'red'}}>{err.name}: {err.message}</span>
    <br />
    {view}
  </pre>
)

class View extends React.Component {
  state = {
    view: null,
    viewText: null,
  }

  componentWillMount() {
    this.updateView(this.props.world)
  }

  componentWillReceiveProps(nextProps) {
    this.updateView(nextProps.world)
  }

  async updateView(world) {
    if (this.state.viewText === world.view) return
    this.setState({view: null, viewText: world.view})
    if (world.view) {
      const runner = new JSRunner(new JSScope({React, actions, connect}))
      try {
        const result = await runner.run(world.view)
        if (typeof result !== 'function') return
        this.setState({view: React.createElement(result)})
      } catch (err) {
        this.setState({view: <ViewError err={err} view={world.view} />})
        // throw err
      }
    }
  }

  render = () => this.state.view
}

const textToEditorState = (text) => (
  D.EditorState.createWithContent(D.ContentState.createFromText(text))
)

const editorStateToText = (editorState) => (
  editorState.getCurrentContent().getPlainText()
)

class Editor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: textToEditorState(this.props.value || ''),
      value: this.props.value || '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({
        editorState: textToEditorState(nextProps.value || ''),
        value: nextProps.value || '',
      })
    }
  }

  onChange = (editorState) => {
    const oldValue = this.state.value
    const newValue = editorStateToText(editorState)
    this.setState({
      editorState,
      value: newValue,
    }, () => {
      if (oldValue !== newValue) {
        this.props.onChange(newValue)
      }
    })
  }

  render() {
    return (
      <D.Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        ref={e => this.editor = e}
      />
    )
  }
}

const App = ({
  onChangeView,
  onClickCreate,
  onClickNavLink,
  onClickNavLinkDelete,
  state,
  thisWorld,
}) => (
  <div className='ii-app'>
    <style>{styleCSS}</style>
    <div>
      <Nav {...{onClickCreate, onClickNavLink, onClickNavLinkDelete, state}} />
      <Editor value={thisWorld.view} onChange={text => onChangeView(text)} />
    </div>
    <div>
      <View world={thisWorld} />
    </div>
  </div>
)

export default connect(
  (state) => ({
    state,
    thisWorld: state.worlds[state.activeWorld],
  }),
  (dispatch) => ({
    onChangeView: (text) => dispatch(actions.updateWorldView(text)),
    onClickCreate: (name) => dispatch(actions.createWorld(name)),
    onClickNavLink: (name) => dispatch(actions.changeWorld(name)),
    onClickNavLinkDelete: (name) => dispatch(actions.deleteWorld(name)),
  }),
)(App)
