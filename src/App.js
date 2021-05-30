import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import theme from './theme';
import { Main, TrainingModal } from './components';

// 전체 배경에 대한 default 색깔을 지정해주는 부분입니다.
const Globalstyle = createGlobalStyle`
  ${reset};
  body{
    background-color: #1F284A;
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
