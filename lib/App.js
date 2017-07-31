import BlockContainer from './BlockContainer'
import CommandLine from './CommandLine'
import React from 'react'
import * as UI from './UI/index'

import './App.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
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
    })
  }

  onCommand = async (command) => {
    let commands
    return await this.handleCommand(command, commands = {
      'clear': async () => (await this.blocks.clearBlocks()),
      'code': async () => (await this.blocks.addCodeBlock('', true)),
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
}
