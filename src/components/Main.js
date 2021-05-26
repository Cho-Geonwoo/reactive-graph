import React, { useState } from 'react';
import styled from 'styled-components';
import Canvas from './Canvas';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const TitleWrapper = styled.h1`
  font-family: NanumSquareRound;
  font-weight: 900;
  font-size: 40px;
`;

const SampleDataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px;
  justify-content: space-around;
  margin-top: 10px;
`;

const SampleDataButton = styled.button`
  /* 공통 스타일 */
  display: flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-family: NanumSquareRound;
  font-weight: 900;
  cursor: pointer;

  /* 텍스트 위치 */
  align-items: center;
  justify-content: center;

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
  /* 공통 스타일 */
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
  /* 공통 스타일 */
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
  const [showTrain, setShowTrain] = useState(false);
  const [showSampleDataOne, setShowSampleDataOne] = useState(false);
  const [showSampleDataTwo, setShowSampleDataTwo] = useState(false);
  const [clear, setClear] = useState(false);
  return (
    <ContentWrapper>
      <TitleWrapper>선형 회귀 실습</TitleWrapper>
      <Canvas
        showTrain={showTrain}
        showSampleDataOne={showSampleDataOne}
        showSampleDataTwo={showSampleDataTwo}
        clear={clear}
        setClear={setClear}
        setShowSampleDataOne={setShowSampleDataOne}
        setShowSampleDataTwo={setShowSampleDataTwo}
        setShowTrain={setShowTrain}
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
        {/* <TrainButton onClick={() => setShowTrain(true)}>
          훈련 과정 자세히 살펴보기
        </TrainButton> */}
        <SampleDataButtonTwo onClick={() => setClear(true)}>
          초기화
        </SampleDataButtonTwo>
      </SampleDataWrapper>
    </ContentWrapper>
  );
};

export default Main;
