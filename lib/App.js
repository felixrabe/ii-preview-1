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

    this._nextBlockId = 0
    this._blockInstances = {}
  }

  componentDidMount() {
    this.commandLine.focus()
  }

  onCommand = async (command) => {
    if (command === '') {
      return ''
    }

    const commands = ({
      'code': async () => (await this.addCodeBlock()),
      'clear': async () => (await this.clearBlocks()),
      'eval': () => ('eval '),
      'help': async () => (await this.addTextBlock(
        `Commands: ${Object.keys(commands).sort().join(' ')}`
      )),
      'run': async () => (await this.runCodeBlocks()),
      'sleep': () => (new Promise(res => setTimeout(() => res('zzz'), 1000))),
      'text': async () => (await this.addTextBlock()),
    })
    let fn = commands[command]
    if (typeof fn !== 'undefined') {
      return await fn()
    }

    if (command.startsWith('eval ')) {
      return await this.evalCode(command.slice(5))
    }

    throw new Error('unknown command')
  }

  clearBlocks = async () => {
    this.setState({blocks: []})
  }

  addCodeBlock = async (text) => {
    this.setState(prevState => {
      const key = `block$${this._nextBlockId++}`
      return {
        blocks: prevState.blocks.concat([
          <CodeBlock
            ref={b => this._blockInstances[key] = b}
            key={key}
            name={key}
            value={text || 'blocks'}
          />,
        ]),
      }
    })
  }

  runCodeBlocks = async () => {
    const output = this.state.blocks.map(b => {
      const inst = this._blockInstances[b.props.name]
      return `<${inst.constructor.name} (${b.props.name})>${inst.getText()}</>`
    })
    this.addTextBlock(output.join('\n'))
  }

  addTextBlock = async (text) => {
    this.setState(prevState => {
      const key = `block$${this._nextBlockId++}`
      return {
        blocks: prevState.blocks.concat([
          <TextBlock
            ref={b => this._blockInstances[key] = b}
            key={key}
            name={key}
            value={text || ''}
          />,
        ]),
      }
    })
  }

  evalCode = async (code) => {
    // eslint-disable-next-line no-unused-vars
    const later = async (v) => new Promise(r => setTimeout(() => r(v), 2000))
    return '' + await eval(`(async () => ${code})()`)
  }

  render = () => (
    <UI.Root className='app'>
      <CommandLine
        ref={c => this.commandLine = c}
        onCommand={this.onCommand}
      />
      <BlockContainer>
        {this.state.blocks}
      </BlockContainer>
    </UI.Root>
  )
}
