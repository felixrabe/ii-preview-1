import BlockContainer from './BlockContainer'
import CodeBlock from './CodeBlock'
import CommandLine from './CommandLine'
import React from 'react'
import TextBlock from './TextBlock'
import * as UI from './UI/index'

import './App.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      blocks: [],
    }

    this._blockInstances = {}
    this._nextBlockId = 0
  }

  addCodeBlock = async (text = '', focus = false) => {
    this.setState(prevState => {
      const key = `block$${this._nextBlockId++}`
      if (focus) {
        setTimeout(() => this._blockInstances[key].focus())
      }

      return {
        blocks: prevState.blocks.concat([
          <CodeBlock
            key={key}
            name={key}
            onCommand={c => this.onBlockCommand(key, c)}
            ref={b => this._blockInstances[key] = b}
            value={text}
          />,
        ]),
      }
    })
  }

  addTextBlock = async (text = '', focus = false) => {
    this.setState(prevState => {
      const key = `block$${this._nextBlockId++}`
      if (focus) {
        setTimeout(() => this._blockInstances[key].focus())
      }

      return {
        blocks: prevState.blocks.concat([
          <TextBlock
            key={key}
            name={key}
            onCommand={c => this.onBlockCommand(key, c)}
            ref={b => this._blockInstances[key] = b}
            value={text}
          />,
        ]),
      }
    })
  }

  clearBlocks = async () => {
    this.setState({blocks: []})
  }

  componentDidMount() {
    this.commandLine.focus()
  }

  onBlockCommand = async (key, command) => {
    if (command === '') {
      return ''
    }

    const commands = ({
      'remove': async () => (await this.removeBlock(key)),
    })
    let fn = commands[command]
    if (typeof fn !== 'undefined') {
      return await fn()
    }

    throw new Error('unknown command')
  }

  onCommand = async (command) => {
    if (command === '') {
      return ''
    }

    const commands = ({
      'clear': async () => (await this.clearBlocks()),
      'code': async () => (await this.addCodeBlock('', true)),
      'help': async () => (await this.addTextBlock(
        `Commands: ${Object.keys(commands).sort().join(' ')}`
      )),
      'run': async () => (await this.runCodeBlocks()),
      'text': async () => (await this.addTextBlock('', true)),
    })
    let fn = commands[command]
    if (typeof fn !== 'undefined') {
      return await fn()
    }

    throw new Error('unknown command')
  }

  removeBlock = async (key) => {
    delete this._blockInstances[key]
    this.setState(prevState => ({
      blocks: prevState.blocks.filter(b => b.props.name !== key),
    }))
  }

  render = () => (
    <UI.Root className='app'>
      <CommandLine
        onCommand={this.onCommand}
        ref={c => this.commandLine = c}
      />
      <BlockContainer>
        {this.state.blocks}
      </BlockContainer>
    </UI.Root>
  )

  runCodeBlocks = async () => {
    const output = this.state.blocks.map(b => {
      const inst = this._blockInstances[b.props.name]
      return `<${inst.constructor.name} (${b.props.name})>${inst.getText()}</>`
    })
    this.addTextBlock(output.join('\n'))
  }
}
