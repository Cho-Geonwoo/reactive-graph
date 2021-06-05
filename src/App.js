import React, { useMemo } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { positions, transitions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import theme from './theme';
import { Main, TrainingModal } from './components';
import useViewFort from './hooks/useViewFort';

import './App.css';

const options = {
  timeout: 5000,
  offset: '10px',
  position: positions.TOP_CENTER,
  transition: transitions.FADE,
};

// 전체 배경에 대한 default 색깔을 지정해주는 부분입니다.
const Globalstyle = createGlobalStyle`
  ${reset};
  body{
    background-color: #1F284A;
  }
`;

function App() {
  const { width, height } = useViewFort();
  return (
    <ThemeProvider theme={theme}>
      <Globalstyle />
      <Provider template={AlertTemplate} {...options}>
        <Main width={width} height={height} />
      </Provider>
      <TrainingModal width={width} />
    </ThemeProvider>
  );
}

export default App;
