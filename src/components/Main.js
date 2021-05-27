import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Canvas from './Canvas';

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

const Main = () => {
  const [showSampleDataOne, setShowSampleDataOne] = useState(false);
  const [showSampleDataTwo, setShowSampleDataTwo] = useState(false);
  const [clear, setClear] = useState(false);
  // rechart 이용한 좌표평면 ui 삽입 필요
  return (
    <ContentWrapper>
      <TitleWrapper>선형 회귀 실습</TitleWrapper>
      <Canvas
        showSampleDataOne={showSampleDataOne}
        showSampleDataTwo={showSampleDataTwo}
        clear={clear}
        setClear={setClear}
        setShowSampleDataOne={setShowSampleDataOne}
        setShowSampleDataTwo={setShowSampleDataTwo}
      />
      <SampleDataWrapper>
        <SampleDataButton onClick={() => setShowSampleDataOne(true)}>
          샘플 데이터 1
        </SampleDataButton>
        <SampleDataButton onClick={() => setShowSampleDataTwo(true)}>
          샘플 데이터 2
        </SampleDataButton>
      </SampleDataWrapper>
      <SampleDataWrapper>
        <SampleDataButtonTwo onClick={() => setClear(true)}>
          초기화
        </SampleDataButtonTwo>
      </SampleDataWrapper>
      <Blank />
    </ContentWrapper>
  );
};

export default React.memo(Main);
