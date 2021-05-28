import React from 'react';
import { useSelector } from 'react-redux';
import { Default } from 'react-awesome-spinners';
import { ModalWrapper, OnTrainingText, MainWrapper } from '../styles/styles';

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
