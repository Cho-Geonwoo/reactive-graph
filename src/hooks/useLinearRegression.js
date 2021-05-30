import * as tf from '@tensorflow/tfjs';
import { useEffect, useState } from 'react';
import { canvasSize } from '../constants/contants';

const useLinearRegression = (dots, model, sampleAdd) => {
  const [result, setResult] = useState([]);
  const [history, setHistory] = useState([]);

  // 점에 대한 정보를 입력 받아 훈련할 수 있는 상태로 가공하는 부분
  const [trainX, trainY] = dots.reduce(
    (accumulator, currentDot) => {
      accumulator[0].push(currentDot[0]);
      accumulator[1].push(currentDot[1]);
      return accumulator;
    },
    [[], []],
  );

  // 모델 훈련을 위한 부분
  useEffect(() => {
    if (trainX.length !== 0) {
      // training data
      const xs = tf.tensor(trainX, [trainX.length]);
      const ys = tf.tensor(trainY, [trainY.length]);
      const curHistory = [];
      const fitParam = {
        epochs: sampleAdd ? 1800 : 100,
        shuffle: true,
        callbacks: {
          onEpochEnd: (epoch, log) => {
            curHistory.push(log);
          },
        },
      };
      // Model training
      model.fit(xs, ys, fitParam).then(() => {
        // Test data Inference
        setResult([
          model.predict(tf.tensor([0])).dataSync() * canvasSize.height,
          model.predict(tf.tensor([1])).dataSync() * canvasSize.height,
        ]);
        setHistory(curHistory);
      });
    }
  }, [dots]);

  return [result, history];
};

export default useLinearRegression;
