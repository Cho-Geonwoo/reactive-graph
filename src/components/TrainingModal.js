import React from 'react';
import { useSelector } from 'react-redux';
import { Default } from 'react-awesome-spinners';
import {
  ModalWrapper,
  OnTrainingText,
  MainWrapper,
  RobotImg,
} from '../styles/styles';

const TrainingModal = () => {
  const onTrain = useSelector((store) => store.answer.onTrain);

  // redux store에 있는 상태가 학습 중이면, training modal을 띄우는 부분입니다.
  return (
    onTrain && (
      <MainWrapper>
        <ModalWrapper>
          <RobotImg
            src={`${process.env.PUBLIC_URL}/images/robot.png`}
            alt="robot"
          />
          <OnTrainingText>데이터를 학습 중입니다.</OnTrainingText>
          <Default />
        </ModalWrapper>
      </MainWrapper>
    )
  );
};

export default TrainingModal;
