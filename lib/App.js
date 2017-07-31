import BlockContainer from './BlockContainer'
import CodeContext from './CodeContext'
import CommandLine from './CommandLine'
import React from 'react'
import * as UI from './UI/index'

import './App.css'

const defaultCode = '// Additional variables: blocks\n'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }

    this.codeContext = new CodeContext(this)
  }

  componentDidMount() {
    this.commandLine.focus()
  }

  handleCommand = async (command, commands) => {
    if (command === '') {
      return ''
    }

    let fn = commands[command]
    if (typeof fn !== 'undefined') {
      return await fn()
    }

    throw new Error('unknown command')
  }

  onBlockCommand = async (key, command) => {
    return await this.handleCommand(command, {
      'remove': async () => (await this.blocks.removeBlock(key)),
      'run': async () => (await this.runBlock(key)),
    })
  }

  onCommand = async (command) => {
    let commands
    return await this.handleCommand(command, commands = {
      'clear': async () => (await this.blocks.clearBlocks()),
      'code': async () => (await this.blocks.addCodeBlock(defaultCode, true)),
      'help': async () => (await this.blocks.addTextBlock(
        `Commands: ${Object.keys(commands).sort().join(' ')}`
      )),
      'text': async () => (await this.blocks.addTextBlock('', true)),
    })
  }

  render = () => (
    <UI.Root className='app'>
      <CommandLine
        onCommand={this.onCommand}
        ref={c => this.commandLine = c}
      />
      <BlockContainer
        onBlockCommand={this.onBlockCommand}
        ref={b => this.blocks = b}
      />
    </UI.Root>
  )

  runBlock = async (key) => {
    const text = this.blocks.getBlockInstance(key).getText()
    const retval = await this.codeContext.run(text)
    console.log('executed code returns:', retval)
    return retval
  }
}
