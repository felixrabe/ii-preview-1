import React from 'react'

import ColorPalette from './ColorPalette'
import {cs} from './Colors'
import CommandLine from './CommandLine'
import Context from './Context'
import Root from './Root'

import 'font-awesome/css/font-awesome.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.context = new Context()
  }

  render() {
    return (
      <Root>
        <ColorPalette style={{
          gridArea: 'header-start / header-start / footer-end / footer-end',
        }} />

        <div style={{
          backgroundColor: cs.yellow[0],
          gridArea: 'header-start / header-start / footer-end / footer-end',
          opacity: 0.5,
        }} />

        <CommandLine style={{
          gridArea: 'main',
          zIndex: 101,
        }} />
      </Root>
    )
  }
}
