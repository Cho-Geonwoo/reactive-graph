import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import theme from './theme';
import { Main, TrainingModal } from './components';

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
      <TrainingModal />
    </ThemeProvider>
  );
}

export default App;
