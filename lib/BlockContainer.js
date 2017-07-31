import CodeBlock from './CodeBlock'
import React from 'react'
import TextBlock from './TextBlock'
import * as UI from './UI/index'

import './BlockContainer.css'

export default class BlockContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      blocks: [],
    }

    this._blockInstances = {}
    this._nextBlockId = 0
  }

  addBlock = async (BlockComponent, text = '', focus = false) => {
    this.setState(prevState => {
      const key = `block$${this._nextBlockId++}`
      if (focus) {
        setTimeout(() => this._blockInstances[key].focus())
      }

      return {
        blocks: prevState.blocks.concat([
          <BlockComponent
            key={key}
            name={key}
            onCommand={c => this.props.onBlockCommand(key, c)}
            ref={b => this._blockInstances[key] = b}
            value={text}
          />,
        ]),
      }
    })
  }

  addCodeBlock = async (text = '', focus = false) => {
    return await this.addBlock(CodeBlock, text, focus)
  }

  addTextBlock = async (text = '', focus = false) => {
    return await this.addBlock(TextBlock, text, focus)
  }

  clearBlocks = async () => {
    this.setState({blocks: []})
  }

  removeBlock = async (key) => {
    delete this._blockInstances[key]
    this.setState(prevState => ({
      blocks: prevState.blocks.filter(b => b.props.name !== key),
    }))
  }

  render = () => (
    <UI.Body className='block-container'>
      {this.state.blocks}
    </UI.Body>
  )

  runCodeBlocks = async () => {
    const output = this.state.blocks.map(b => {
      const inst = this._blockInstances[b.props.name]
      return `<${inst.constructor.name} (${b.props.name})>${inst.getText()}</>`
    })
    this.addTextBlock(output.join('\n'))
  }
}
