import React from 'react'
import {connect} from 'react-redux'

const connector = connect(
  (state, ownProps) => ({
    inBrowser: state.inBrowser && !state.inNode,
  }),
  (dispatch, ownProps) => ({
    // onChange: (newValue) => dispatch(actions.xxxx(newValue))
  }),
)

class AceSafelyWrapped extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      Ace: null,
      isAceLoading: false,
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.inBrowser && !this.state.Ace && !this.state.isAceLoading) {
      this.setState({isAceLoading: true})
      const Ace = await SystemJS.import('./Ace.jsx', __moduleName)
      this.setState({Ace, isAceLoading: false})
    }
  }

  render() {
    return this.state.Ace ? <this.state.Ace /> : null
  }
}

export const __useDefault = connector(AceSafelyWrapped)
export default __useDefault
