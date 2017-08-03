import React from 'react'

export default class Thing {
  constructor(elem) {
    this._key = undefined
    this._elem = elem
  }

  getKey = () => {
    return this._key
  }

  render = () => {
    return this._elem
  }

  setKey = (key) => {
    this._key = key
    this._elem = React.cloneElement(this._elem, {key: key})
  }
}
