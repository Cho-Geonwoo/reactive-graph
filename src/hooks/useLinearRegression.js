import * as tf from '@tensorflow/tfjs';
import { useEffect, useState } from 'react';

const useLinearRegression = (dots, model, sampleAdd) => {
  const [result, setResult] = useState([]);
  const [history, setHistory] = useState([]);
  const [trainX, trainY] = dots.reduce(
    (accumulator, currentDot) => {
      accumulator[0].push(currentDot[0]);
      accumulator[1].push(currentDot[1]);
      return accumulator;
    },
    [[], []],
  );
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
          model.predict(tf.tensor([0])).dataSync() * 600,
          model.predict(tf.tensor([1])).dataSync() * 600,
        ]);
        setHistory(curHistory);
      });
    }
  }, [dots]);

  return [result, history];
};

export default useLinearRegression;
