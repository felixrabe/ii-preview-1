import {ts} from './Vars'

export const style = `


  /* core */


  .core-app {
    background-color: ${ts.normalBG};
    font-family: sans-serif;
    font-size: 1em;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .core-app.core-animate-none .react-grid-item {
    transition: none;
  }

  .core-app .core-obj {
    background-color: ${ts.normalBG};
    border-radius: 5px;
    box-shadow: 1px 2px 6px ${ts.boxShadow};
    color: ${ts.normalFG};
    display: grid;
    grid-template-rows: min-content 1fr;
    overflow: hidden;
  }

  .core-app .core-obj.react-grid-item .react-resizable-handle {
    background: none;
    cursor: nwse-resize;
  }

  .core-app .react-grid-placeholder {
    background-color: ${ts.black[2]};
    opacity: 0.3;
  }

  .core-app .core-obj-header {
    background-color: ${ts.headerBG};
    color: ${ts.headerFG};
    cursor: default;
    display: flex;
    flex-direction: row;
    font-weight: normal;
    user-select: none;
    white-space: pre;
  }

  .core-app .core-obj-header-item {
    flex: 0 0 auto;
    padding: 0px ${ts.padding};
  }

  .core-app .core-obj-header-space {
    flex: 1 0 auto;
  }

  .core-app .core-obj-command {
    cursor: pointer;
    user-select: none;
  }

  .core-app .core-obj-command:hover {
    color: ${ts.headerFGHover};
  }

  .core-app .core-obj-body {
    display: grid;
    overflow: auto;
  }

  .core-app .core-padding {
    padding: ${ts.padding};
  }

  .core-app .core-padding-top-bottom {
    padding-bottom: ${ts.padding};
    padding-top: ${ts.padding};
  }

  .core-app .core-repr {
    font-style: italic;
  }

  .core-app .core-scope {
    align-content: flex-start;
    align-items: baseline;
    display: flex;
    flex-flow: row wrap;
    line-height: 1.2;
  }

  .core-app .core-scope-hidden-obj {
    cursor: pointer;
    padding: 0px ${ts.padding};
    user-select: none;
  }

  .core-app .core-command-line {
    background-color: ${ts.commandLineBG};
    color: ${ts.commandLineFG};
  }

  .core-app .core-command-line ::selection {
    background-color: ${ts.commandLineSelBG.sel};
    color: ${ts.commandLineSelFG};
    opacity: 1.0;
  }

  .core-app .core-command-line ::-moz-selection {
    background-color: ${ts.commandLineSelBG};
    color: ${ts.commandLineSelFG};
    opacity: 1.0;
  }

  .core-app .core-command-line-editor {
    width: 100%;
  }

  .core-app .core-command-line-error {
    color: ${ts.errorFG};
    cursor: pointer;
    font-weight: bold;
    user-select: none;
  }

  .core-app .core-editor {
    display: inline-block;
    min-width: 1em;
  }

  /* user */

`
