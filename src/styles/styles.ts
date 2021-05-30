import styled, { css } from 'styled-components';

const CanvasWrapper = styled.canvas`
  border: 2px solid;
  z-index: 1;
  background-color: ${(props) => props.theme.canvasColor};
`;

const buttonStyle = css`
  display: flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-family: NanumSquareRound;
  font-weight: 900;
  cursor: pointer;
  margin-top: 20px;

  /* 텍스트 위치 */
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 0;
`;

const ScatterChartWrapper = styled.div`
  z-index = 1
  background-color: white;
`;

const TitleWrapper = styled.h1`
  font-family: NanumSquareRound;
  font-weight: 900;
  font-size: 40px;
  color: white;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Blank = styled.div`
  height: 200px;
`;

const SampleDataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px;
  justify-content: space-around;
  margin-top: 10px;
`;

const SampleDataButton = styled.button`
  /* Common Style */
  ${buttonStyle}

  /* 크기 */
  height: 40px;
  width: 150px;

  /* 색상 */
  background: #228be6;
  &:hover {
    background: #339af0;
  }
  &:active {
    background: #1c7ed6;
  }
`;

const SampleDataButtonTwo = styled.button`
  /* Common Style */
  ${buttonStyle}

  /* 크기 */
  height: 40px;
  width: 100px;

  /* 색상 */
  background: #228be6;
  &:hover {
    background: #339af0;
  }
  &:active {
    background: #1c7ed6;
  }
`;

const TrainButton = styled.button`
  /* Common Style */
  ${buttonStyle}
  /* 크기 */
  height: 40px;
  width: 200px;

  /* 색상 */
  background: #228be6;
  &:hover {
    background: #339af0;
  }
  &:active {
    background: #1c7ed6;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(100, 100, 100, 0.5);
`;

const ModalWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto auto;
  width: 700px;
  height: 450px;
  background: snow;
  border: solid;
  z-index: 3;
  opacity: 1;
`;

const OnTrainingText = styled.h1`
  font-family: NanumSquareRound;
  font-weight: 900;
  font-size: 40px;
  margin-bottom: 20px;
`;

export {
  CanvasWrapper,
  ContentWrapper,
  ScatterChartWrapper,
  TitleWrapper,
  Blank,
  SampleDataWrapper,
  SampleDataButton,
  SampleDataButtonTwo,
  TrainButton,
  ModalWrapper,
  OnTrainingText,
  MainWrapper,
};
