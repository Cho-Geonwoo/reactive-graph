import styled, { css, keyframes } from 'styled-components';
import { canvasSize } from '../constants/contants';

const CanvasWrapper = styled.canvas`
  position: relative;
  z-index: 1;
  background-color: ${(props) => props.theme.canvasColor};
  border-radius: 10px;
`;

const buttonStyle = css`
  display: flex;
  outline: none;
  border: none;
  border-radius: 10px;

  /* font styling */
  color: #ffffff;
  font-family: NanumSquareRound;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  text-transform: capitalize;
  letter-spacing: -1px;

  /* 텍스트 위치 */
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow: scroll;
  z-index: 0;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
    width: 100%;
    margin: 30px 0 0 0;
  }
`;

const ContentOneWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 0;
`;

const ContentTwoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 22px;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 130px;
  height: 200px;
  margin-top: 494px;
  background: rgba(0, 11, 49, 0.7);
  border-radius: 20px;
`;

const TotalWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
  flex-direction: row;
  justify-content: space-between;
  overflow: scroll;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
`;

const GraphWrapper = styled.div`
  width: 30%;
  height: 100vh;
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: scroll;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const ScatterChartWrapper = styled.div`
  z-index = 1
  background-color: white;
`;

const TitleWrapper = styled.h1`
  font-family: SpoqaHanSansNeo !important;
  width: calc(100%);
  text-align: center;
  margin: 50px auto 50px;
  font-weight: 500;
  font-style: normal;
  font-size: 35px;
  line-height: 56px;
  letter-spacing: -2px;
  text-transform: capitalize;
  color: white;
  @media only screen and (max-width: 1200px) {
    width: 100%;
    text-align: center;
    margin: 10px auto 10px;
  }
`;

const Blank = styled.div`
  height: 200px;
`;

const SampleDataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
  @media only screen and (max-width: 1200px) {
    width: 100%;
    justify-content: center;
  }
`;

const SampleDataButton = styled.button`
  /* Common Style */
  ${buttonStyle}

  /* 크기 */
  height: 50px;
  width: 150px;
  font-style: normal;
  font-size: 16px;
  line-height: 56px;
  letter-spaceing: -1px;
  text-transform: capitalize;

  /* 위치 */
  margin-left: ${(props) => props.left}px;

  /* 색상 */
  background: linear-gradient(
    135deg,
    #40ddff 0%,
    #14bae3 19.24%,
    #13b1e6 68.64%,
    #11aadf 81.77%,
    #0b98c5 100%
  );

  &:hover {
    background: #339af0;
  }
  &:active {
    background: #1c7ed6;
  }
`;

const InitializeButton = styled.button`
  /* Common Style */
  ${buttonStyle}

  /* 크기 */
  height: 40px;
  width: 130px;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: -1px;

  /* 색상 */
  background: linear-gradient(
    125.46deg,
    #78e6aa 8.72%,
    #70d2a3 41.3%,
    #5db8a2 81.21%
  );
  &:hover {
    background: #5be191;
  }
  &:active {
    background: #5be191;
  }
`;

const InputButton = styled.button`
  /* Common Style */
  ${buttonStyle}
  /* 크기 */
  height: 30px;
  width: 110px;
  font-size: 16px;
  line-height: 56px;
  letter-spacing: -1px;
  text-transform: capitalize;

  /* 색상 */
  background: linear-gradient(137.61deg, #e9eeff -88.58%, #949494 82.59%);
  &:hover {
    background: #606060;
  }
  &:active {
    background: #606060;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(100, 100, 100, 0.5);
`;

const MainWrapperTwo = styled.div`
  display: flex;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(100, 100, 100, 0);
`;

const FadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
`;

const ModalWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: auto auto;
  width: 620px;
  height: 400px;
  background: #dfe5f4;
  border-radius: 20px;
  box-shadow: 20px 20px 30px rgba(15, 32, 77, 0.5);
  z-index: 4;
  animation: ${(props) =>
    props.minimized &&
    css`
      ${FadeOut} 1s
    `};
`;

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

const DefaultWrapper = styled.div`
  position: relative;
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  animation: ${FadeIn} 1s;
  @media only screen and (max-width: 1200px) {
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    margin-right: 20px;
    bottom: 20px;
  }
`;

const OnTrainingText = styled.h1`
  font-family: NanumSquareRound;
  font-weight: 600;
  font-size: 35px;
  line-height: 160%;
  margin-bottom: 20px;
  color: #15baf2;
  text-transform: capitalize;
  letter-spacing: -1.5px;
`;

const InputText = styled.h1`
  font-family: NanumSquareRound;
  color: white;
  font-weight: 700;
  font-size: 18px;
  margin-top: 25px;
  margin-bottom: 12px;
`;

const VariableText = styled.h1`
  font-family: NanumSquareRound;
  color: white;
  font-weight: 800;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: -1.5px;
`;

const InputBox = styled.input`
  width: 90px;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  background-color: #1f284a;
  margin-left: 3px;
  caret-color: #cccccc;
  font-family: NanumSquareRound;
  font-weight: 800;
  color: white;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

const GridBox = styled.div`
  display: grid;
  align-items: center;
`;

const GridWrapper = styled.div`
  position: absolute;
  top: 154px;
  left: -2px;
  width: ${canvasSize.width}px;
  height: ${canvasSize.height}px;
  border: 2px solid;
  z-index: 0;
  background-color: white;
  border-radius: 10px;
  @media only screen and (max-width: 1200px) {
    top: 74px;
    left: auto;
    width: ${(props) => props.width * 0.7}px;
    height: ${(props) => props.width * 0.7}px;
  }
`;

const VerticalLine = styled.div`
  position: absolute;
  width: 0px;
  height: ${canvasSize.height - 2}px;
  border: 0.7px solid #e9e9e9;
  z-index: 1;
  left: ${(props) => props.left}px;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const HorizontalLine = styled.div`
  position: absolute;
  width: ${canvasSize.width - 2}px;
  height: 0px;
  border: 0.7px solid #e9e9e9;
  z-index: 1;
  top: ${(props) => props.top}px;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const RobotImg = styled.img`
  width: 100px;
  margin-bottom: 15px;
`;

const AlgorimaLogoWrapper = styled.a`
  margin-top: auto;
  margin-bottom: 70px;
`;

const AlgorimaImg = styled.img`
  width: 400px;
`;

const HorizontalAxis = styled.div`
  position: absolute;
  display: flex;
  left: -5px;
  top: 621px;
  flex-direction: row;
  width: 620px;
  justify-content: space-between;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const VerticalAxis = styled.div`
  position: absolute;
  display: flex;
  left: -41px;
  top: -10px;
  flex-direction: column-reverse;
  height: 620px;
  justify-content: space-between;
  align-items: flex-end;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const AxisNumberText = styled.h1`
  font-family: Helvetica Neue;
  font-size: 17px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.42px;
  color: #cccccc;
`;

const GraphTitle = styled.h1`
  margin: 200px 0 5% 0;
  font-family: SpoqaHanSansNeo !important;
  font-weight: 500;
  font-style: normal;
  font-size: 25px;
  line-height: 56px;
  text-align: center;
  letter-spacing: -2px;
  text-transform: capitalize;
  color: #222222;
`;

const ChartWrapper = styled.div`
  font-family: Helvetica Neue;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

const VerticalRechartText = styled.h1`
  transform: rotate(-90deg);
  font-size: 16px;
  color: black;
  margin-right: -40px;
`;

const HorizontalRechartText = styled.h1`
  font-family: Helvetica Neue;
  margin-top: 5px;
  margin-left: 10%;
  width: 100%;
  font-size: 16px;
  text-align: center;
  color: black;
`;

const CompressImg = styled.img`
  margin-top: 20px;
  margin-left: auto;
  margin-right: 20px;
  margin-bottom: 40px;
  width: 15px;
  &:hover {
    width: 20px;
    margin-bottom: 35px;
  }
`;

export {
  TotalWrapper,
  CanvasWrapper,
  ContentWrapper,
  ContentOneWrapper,
  ContentTwoWrapper,
  InputWrapper,
  ScatterChartWrapper,
  TitleWrapper,
  Blank,
  SampleDataWrapper,
  SampleDataButton,
  InitializeButton,
  InputButton,
  ModalWrapper,
  OnTrainingText,
  MainWrapper,
  MainWrapperTwo,
  GraphWrapper,
  InputText,
  InputBox,
  GridBox,
  VariableText,
  VerticalLine,
  HorizontalLine,
  GridWrapper,
  RobotImg,
  AlgorimaImg,
  CompressImg,
  HorizontalAxis,
  VerticalAxis,
  AxisNumberText,
  GraphTitle,
  AlgorimaLogoWrapper,
  ChartWrapper,
  DefaultWrapper,
  VerticalRechartText,
  HorizontalRechartText,
};
