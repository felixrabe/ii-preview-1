import React from 'react'
import {connect} from 'react-redux'

const Link = ({children, onClick}) => (
  <a href='#' onClick={e => {e.preventDefault(), onClick()}}>
    {children}
  </a>
)

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch({type: ownProps.type, text: ownProps.text})
  }
})

const Action = connect(
  undefined,
  mapDispatchToProps,
)(Link)

export default Action
