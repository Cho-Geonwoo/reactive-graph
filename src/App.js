import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import theme from './theme';
import Main from './components/Main';

const Globalstyle = createGlobalStyle`
  ${reset};
  body{
    background-color: black;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Globalstyle />
      <Main />
    </ThemeProvider>
  );
}

export default App;
