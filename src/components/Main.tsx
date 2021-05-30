import React, { useState } from 'react';
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
import {
  ContentWrapper,
  ScatterChartWrapper,
  TitleWrapper,
  Blank,
  SampleDataWrapper,
  SampleDataButton,
  SampleDataButtonTwo,
  TrainButton,
} from '../styles/styles';

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

export default Main;
