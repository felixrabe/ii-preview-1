import D from 'draft-js'
import ProcessColors from './ProcessColors'
import ProcessDisabled from './ProcessDisabled'
import React from 'react'

import './TextInputBase.css'

export default class TextInputBase extends React.Component {
  constructor(props, className) {
    super(props)

    this._className = className || ''
  }

  focus = () => {
    this.editor.focus()
  }

  renderEditor() {
    return (
      <D.Editor
        ref={e => this.editor = e}
        editorState={this.props.editorState}
        onChange={this.props.onChange}
        readOnly={this.props.readOnly || this.props.disabled}
      />
    )
  }

  render = () => (
    <ProcessDisabled {...this.props}
      omit='editorState onChange onReturn readOnly'>
      <ProcessColors>
        <div className={'ui-text-input-base ' + this._className}>
          {this.renderEditor()}
          {this.props.children}
        </div>
      </ProcessColors>
    </ProcessDisabled>
  )
}
