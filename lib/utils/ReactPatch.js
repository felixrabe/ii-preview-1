// https://github.com/facebook/react/issues/2461#issuecomment-227022982
// https://gist.github.com/Aldredcz/4d63b0a9049b00f54439f8780be7f0d8

import React from 'react'

const statelessComponentsMap = new Map()

function logError(Component, error) {
  const errorMsg = `Error while rendering component. Check render() method of component '${Component.displayName || Component.name || '[unidentified]'}'.`

  console.error(errorMsg, 'Error details:', error)

  return (
    <span
      style={{
        background: 'red',
        color: 'white'
      }}
    >
      Render error — see console for details.
    </span>
  )
}

function monkeypatchRender(prototype) {
  if (!prototype) return undefined

  let render
  if (prototype.render) {
    if (prototype.render.__handlingErrors) return undefined
    render = prototype.render
  }

  const monkeypatchedRender = function() {
    try {
      return render.call(this)
    } catch (error) {
      return logError(prototype.constructor, error)
    }
  }
  monkeypatchedRender.__handlingErrors = true

  Object.defineProperty(prototype, 'render', {
    configurable: true,
    enumerable: true,
    get() { return monkeypatchedRender },
    set(r) { render = r },
  })
}

const originalCreateElement = React.createElement
React.createElement = (Component, ...rest) => {
  if (typeof Component === 'function') {
    if (Component.prototype && Component.prototype.isReactComponent) {
      monkeypatchRender(Component.prototype);
    } else {
      const originalStatelessComponent = Component;
      if (statelessComponentsMap.has(originalStatelessComponent)) {
        Component = statelessComponentsMap.get(originalStatelessComponent)
      } else {
        Component = function monkeypatchedStatelessComponent(...args) {
          try {
            return originalStatelessComponent(...args)
          } catch (error) {
            return logError(originalStatelessComponent, error)
          }
        }

        Object.assign(Component, originalStatelessComponent)
        statelessComponentsMap.set(originalStatelessComponent, Component)
      }
    }
  }

  return originalCreateElement.call(React, Component, ...rest)
};


// allowing hot reload
const originalForceUpdate = React.Component.prototype.forceUpdate
React.Component.prototype.forceUpdate = function monkeypatchedForceUpdate() {
  monkeypatchRender(this)
  originalForceUpdate.call(this)
}
