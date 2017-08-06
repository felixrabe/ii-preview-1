import {ts} from './StyleVars'

export const style = `
  .app {
    background-color: ${ts.normalBG};
    font-family: sans-serif;
    font-size: 1em;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .app.animate-none .react-grid-item {
    transition: none;
  }

  .app .obj-frame {
    background-color: ${ts.normalBG};
    border-radius: 5px;
    box-shadow: 1px 2px 6px ${ts.boxShadow};
    color: ${ts.normalFG};
    display: grid;
    grid-template-rows: min-content 1fr;
    overflow: hidden;
  }

  .app .obj-frame.react-grid-item > .react-resizable-handle {
    background: none;
    cursor: nwse-resize;
  }

  .app .obj-header {
    background-color: ${ts.headerBG};
    color: ${ts.headerFG};
    cursor: default;
    font-size: 0.9em;
    font-weight: bold;
    padding: 0px ${ts.padding};
    user-select: none;
    white-space: pre;
  }

  .app .obj-command:hover {
    color: ${ts.headerFGHover};
  }

  .app .obj-command, .link {
    cursor: pointer;
    user-select: none;
  }

  .app .link:hover {
    color: ${ts.normalFGHover};
  }
`
