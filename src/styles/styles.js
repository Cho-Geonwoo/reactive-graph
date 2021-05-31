import styled, { css } from 'styled-components';
import { canvasSize } from '../constants/contants';

const CanvasWrapper = styled.canvas`
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
  display: flex;
  flex-direction: row;
  z-index: 0;
`;

const ContentOneWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 0;
`;

const ContentTwoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 22px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 130px;
  height: 200px;
  margin-top: 482px;
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
`;

const GraphWrapper = styled.div`
  width: 30%;
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ScatterChartWrapper = styled.div`
  z-index = 1
  background-color: white;
`;

const TitleWrapper = styled.h1`
  font-family: NotoSansCJKkR;
  font-weight: 500;
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
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
`;

const SampleDataButton = styled.button`
  /* Common Style */
  ${buttonStyle}

  /* 크기 */
  height: 50px;
  width: 150px;

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

  /* 색상 */
  background: linear-gradient(
    125.46deg,
    #78e6aa 8.72%,
    #70d2a3 41.3%,
    #5db8a2 81.21%
  );
  &:hover {
    background: #00ac00;
  }
  &:active {
    background: #00ac00;
  }
`;

const InputButton = styled.button`
  /* Common Style */
  ${buttonStyle}
  /* 크기 */
  height: 30px;
  width: 110px;

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

const ModalWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto auto;
  width: 620px;
  height: 400px;
  background: #dfe5f4;
  border-radius: 20px;
  box-shadow: 20px 20px 30px rgba(15, 32, 77, 0.5);
  z-index: 4;
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
  top: 140px;
  left: -2px;
  width: ${canvasSize.width}px;
  height: ${canvasSize.height}px;
  border: 2px solid;
  z-index: 0;
  background-color: white;
  border-radius: 10px;
`;

const VerticalLine = styled.div`
  position: absolute;
  width: 0px;
  height: ${canvasSize.height - 2}px;
  border: 0.7px solid #e9e9e9;
  z-index: 1;
  left: ${(props) => props.left}px;
`;

const HorizontalLine = styled.div`
  position: absolute;
  width: ${canvasSize.width - 2}px;
  height: 0px;
  border: 0.7px solid #e9e9e9;
  z-index: 1;
  top: ${(props) => props.top}px;
`;

const RobotImg = styled.img`
  width: 100px;
  margin-bottom: 15px;
`;

const EasyDeepImg = styled.img`
  width: 400px;
  margin-bottom: 70px;
`;

const HorizontalAxis = styled.div`
  position: absolute;
  display: flex;
  left: -5px;
  top: 621px;
  flex-direction: row;
  width: 620px;
  justify-content: space-between;
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
  margin: auto 0;
  font-family: NotoSansCJKkr;
  font-weight: 600;
  font-style: normal;
  font-size: 25px;
  line-height: 56px;
  text-align: center;
  letter-spacing: -2px;
  text-transform: capitalize;
  color: #222222;
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
  GraphWrapper,
  InputText,
  InputBox,
  GridBox,
  VariableText,
  VerticalLine,
  HorizontalLine,
  GridWrapper,
  RobotImg,
  EasyDeepImg,
  HorizontalAxis,
  VerticalAxis,
  AxisNumberText,
  GraphTitle,
};
