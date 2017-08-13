import React from 'react'

export default class NavigatorView extends React.Component {
  render() {
    return (
      <div>
        <em>Navigator View ({JSON.stringify(this.props.config)})</em>
      </div>
    )
  }
}
