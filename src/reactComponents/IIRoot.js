import React from 'react'
import Draggable from 'react-draggable'

import autokey from '../reactUtils/autokey'
import {styleCSS} from './IIStyle'

class IIRoot extends React.Component {
  render() {
    let dragging = false
    return autokey([
      <style>{styleCSS}</style>,
      <div
        className='ii-overlay'
      />,
      <Draggable
        onDrag={() => {
          dragging = true
        }}
        onStop={() => {
          dragging = false
        }}
      >
        <div>
          <div
            className='ii-window'
            onMouseOut={() => {
              if (dragging) return
              document.body.classList.remove('ii-overlay-active')
            }}
            onMouseOver={() => {
              document.body.classList.add('ii-overlay-active')
            }}
          />
        </div>
      </Draggable>,
    ])
  }
}

export const __useDefault = IIRoot
export default __useDefault
