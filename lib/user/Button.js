import React from 'react'

export default class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div
        className='user-button'
        onClick={this.props.do}
      >
        <div className='user-button-inner'>
          {this.props.text}
        </div>
      </div>
    )
  }
}
