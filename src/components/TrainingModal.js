import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Default } from 'react-awesome-spinners';

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

const TrainingModal = () => {
  const onTrain = useSelector((store) => store.answer.onTrain);
  return (
    onTrain && (
      <MainWrapper>
        <ModalWrapper>
          <OnTrainingText>학습 중입니다.</OnTrainingText>
          <Default />
        </ModalWrapper>
      </MainWrapper>
    )
  );
};

export default TrainingModal;
