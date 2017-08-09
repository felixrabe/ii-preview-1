import {ts} from './Vars'

export const style = `


  /* core */


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

  .app .obj-frame.react-grid-item .react-resizable-handle {
    background: none;
    cursor: nwse-resize;
  }

  .app .react-grid-placeholder {
    background-color: ${ts.black[2]};
    opacity: 0.3;
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

  .app .obj-command {
    cursor: pointer;
    user-select: none;
  }

  .app .obj {
    display: grid;
    overflow: auto;
  }

  .app .dir {
    list-style-type: none;
    margin: 0px;
    padding: ${ts.padding};
  }

  .app .repr {
    padding: ${ts.padding};
  }

  .app .command-line {
    background-color: ${ts.commandLineBG};
    color: ${ts.commandLineFG};
    padding: ${ts.padding};
  }

  .app .command-line ::selection {
    background-color: ${ts.commandLineSelBG.sel};
    color: ${ts.commandLineSelFG};
    opacity: 1.0;
  }

  .app .command-line ::-moz-selection {
    background-color: ${ts.commandLineSelBG};
    color: ${ts.commandLineSelFG};
    opacity: 1.0;
  }

  .app .command-line-editor {
    width: 100%;
  }

  .app .command-line-error {
    color: ${ts.errorFG};
    cursor: pointer;
    font-weight: bold;
    user-select: none;
  }

  .app .editor {
    display: inline-block;
    min-width: 1em;
  }


  /* user */


  .user-button {
    background-color: ${ts.primary[0]};
    color: ${ts.primary[4]};
    cursor: pointer;
    display: grid;
    transition: background-color 150ms, color 150ms;
  }

  .user-button:hover {
    background-color: ${ts.primary[1]};
    color: ${ts.primary[4]};
  }

  .user-button .user-button-inner {
    align-self: center;
    justify-self: center;
  }

  .user-text {
    padding: ${ts.padding};
  }

  .user-live {

  }
`
