const tc = {
  light: '#aaa',
}

export const style = `
  .frame {
    border: 2px solid black;
    margin: 6px;
    padding: 6px;
  }

  .frame::before {
    content: attr(class) " ";
    color: ${tc.light};
    font-size: small;
  }

  .app {

  }

  .grid-layout {

  }

  .grid-layout-obj {
    border-color: #b00;
  }
`
