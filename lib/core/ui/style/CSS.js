import {ts} from './Vars'

export const style = `


  /* core */


  .idev-app {
    background-color: ${ts.background};
    font-family: sans-serif;
    font-size: 1em;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .idev-app.idev-animate-none .react-grid-item {
    transition: none;
  }

  .idev-app .idev-obj {
    background-color: ${ts.normalBG};
    border-radius: 5px;
    box-shadow: 1px 2px 6px ${ts.shadow};
    color: ${ts.normalFG};
    display: grid;
    grid-template-rows: min-content 1fr;
    overflow: hidden;
  }

  .idev-app .idev-obj.react-grid-item .react-resizable-handle {
    background: none;
    cursor: nwse-resize;
  }

  .idev-app .react-grid-placeholder {
    background-color: ${ts.black[2]};
    border-radius: 5px;
    opacity: 0.3;
  }

  .idev-app .idev-obj-header {
    background-color: ${ts.headerBG};
    color: ${ts.headerFG};
    cursor: default;
    display: flex;
    flex-direction: row;
    font-size: 0.8em;
    font-weight: normal;
    user-select: none;
    white-space: pre;
  }

  .idev-app .idev-obj-header-item {
    flex: 0 0 auto;
    padding: 0px ${ts.padding};
  }

  .idev-app .idev-obj-header-space {
    flex: 1 0 auto;
  }

  .idev-app .idev-obj-command {
    cursor: pointer;
    user-select: none;
  }

  .idev-app .idev-obj-command:hover {
    color: ${ts.headerFGHover};
  }

  .idev-app .idev-obj-body {
    display: grid;
    overflow: auto;
  }

  .idev-app .idev-padding {
    padding: ${ts.padding};
  }

  .idev-app .idev-padding-top-bottom {
    padding-bottom: ${ts.padding};
    padding-top: ${ts.padding};
  }

  .idev-app .idev-repr {
    font-style: italic;
  }

  .idev-app .idev-scope {
    align-content: flex-start;
    align-items: baseline;
    display: flex;
    flex-flow: row wrap;
    line-height: 1.2;
  }

  .idev-app .idev-scope-hidden-obj {
    cursor: pointer;
    padding: 0px ${ts.padding};
    user-select: none;
  }

  .idev-app .idev-command-line {
    background-color: ${ts.commandLineBG};
    color: ${ts.commandLineFG};
  }

  .idev-app .idev-command-line ::selection {
    background-color: ${ts.commandLineSelBG.sel};
    color: ${ts.commandLineSelFG};
    opacity: 1.0;
  }

  .idev-app .idev-command-line ::-moz-selection {
    background-color: ${ts.commandLineSelBG};
    color: ${ts.commandLineSelFG};
    opacity: 1.0;
  }

  .idev-app .idev-command-line-editor {
    width: 100%;
  }

  .idev-app .idev-command-line-error {
    color: ${ts.errorFG};
    cursor: pointer;
    font-weight: bold;
    user-select: none;
  }

  .idev-app .idev-editor {
    display: inline-block;
    min-width: 1em;
  }


  /* user */


`
