import React, { useRef, useEffect, useCallback, useState } from 'react';
import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { answerActions } from '../redux/actions';

import useLinearRegression from '../hooks/useLinearRegression';

const CanvasWrapper = styled.canvas`
  border: 2px solid;
  z-index: 1;
  background-color: ${(props) => props.theme.canvasColor};
`;

// normalized datas
const dataSampleOne = [
  [0, 0],
  [1 / 12, 1 / 12],
  [1 / 6, 1 / 6],
  [1 / 4, 1 / 4],
  [1 / 3, 1 / 3],
  [5 / 12, 5 / 12],
  [1 / 2, 1 / 2],
  [7 / 12, 7 / 12],
  [2 / 3, 2 / 3],
  [3 / 4, 3 / 4],
  [5 / 6, 5 / 6],
  [11 / 12, 11 / 12],
  [1, 1],
];

// normalized datas
const dataSampleTwo = [
  [0, 1],
  [1 / 12, 11 / 12],
  [1 / 6, 5 / 6],
  [1 / 4, 3 / 4],
  [1 / 3, 2 / 3],
  [5 / 12, 7 / 12],
  [1 / 2, 1 / 2],
  [7 / 12, 5 / 12],
  [2 / 3, 1 / 3],
  [3 / 4, 1 / 4],
  [5 / 6, 1 / 6],
  [11 / 12, 1 / 12],
  [1, 0],
];

let model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
model.compile({
  loss: 'meanSquaredError',
  optimizer: 'SGD',
  metrics: ['mse'],
});

const Canvas = ({
  showTrain = false,
  showSampleDataOne = false,
  showSampleDataTwo = false,
  clear = false,
  setClear,
  setShowTrain,
  setShowSampleDataOne,
  setShowSampleDataTwo,
}) => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const [dots, setDots] = useState([]);
  const [sampleAdd, setSampleAdd] = useState(false);
  const [result, history] = useLinearRegression(dots, model, sampleAdd);
  const [prevLine, setPrevLine] = useState([300, 300]);
  const [line, setLine] = useState([300, 300]);
  const [lineMoving, setLineMoving] = useState(false);
  const surface = { name: 'Training Performance', tab: 'history' };
  const reInitializeModel = useCallback(() => {
    model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({
      loss: 'meanSquaredError',
      optimizer: 'SGD',
      metrics: ['mse'],
    });
  }, []);

  const clearCanvas = useCallback(() => {
    reInitializeModel();
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    setDots([]);
  }, []);

  // click event가 발생했을 때 해당 위치에 점을 그리는 함수입니다.
  const addDot = useCallback((event) => {
    if (!lineMoving) {
      const context = canvasRef.current.getContext('2d');
      const rect = canvasRef.current.getBoundingClientRect();
      const coordinates = [
        (event.clientX - rect.left) / rect.height,
        (rect.height - event.clientY + rect.top) / rect.height,
      ];
      if (coordinates) {
        setDots((prevArray) => [...prevArray, coordinates]);
      }
      context.beginPath();
      context.arc(
        event.clientX - rect.left,
        event.clientY - rect.top,
        5,
        0,
        2 * Math.PI,
        false,
      );
      context.fillStyle = 'black';
      context.fill();
      context.stroke();
      dispatch(answerActions.setTrainState(true));
    }
  }, []);

  // x, y 좌표를 받아 점을 찍는 함수입니다.
  const plotDot = useCallback((dotCoordinate) => {
    const context = canvasRef.current.getContext('2d');
    context.beginPath();
    context.arc(
      dotCoordinate[0] * 600,
      600 - dotCoordinate[1] * 600,
      5,
      0,
      2 * Math.PI,
      false,
    );
    context.fillStyle = 'black';
    context.fill();
    context.stroke();
  }, []);

  // 샘플 데이터1 버튼을 클릭했을 때, dataSampleOne 배열에 있는 점들을 캔버스에 추가하는 액션입니다.
  useEffect(() => {
    if (showSampleDataOne) {
      setSampleAdd(true);
      clearCanvas();
      const dotSample = [];
      dataSampleOne.map((dot) => {
        plotDot(dot);
        dotSample.push(dot);
        return dot;
      });
      dispatch(answerActions.setTrainState(true));
      setDots(dotSample);
      setShowSampleDataOne(false);
    }
  }, [showSampleDataOne]);

  // 샘플 데이터2 버튼을 클릭했을 때, dataSampleTwo 배열에 있는 점들을 캔버스에 추가하는 액션입니다.
  useEffect(() => {
    if (showSampleDataTwo) {
      setSampleAdd(true);
      clearCanvas();
      const dotSample = [];
      dataSampleTwo.map((dot) => {
        plotDot(dot);
        dotSample.push(dot);
        return dot;
      });
      dispatch(answerActions.setTrainState(true));
      setDots(dotSample);
      setShowSampleDataTwo(false);
    }
  }, [showSampleDataTwo]);

  // 초기화 버튼을 클릭했을 때,
  useEffect(() => {
    if (clear) {
      clearCanvas();
      setClear(false);
      setLine([300, 300]);
    }
  }, [clear]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener('click', addDot);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.beginPath();
    context.moveTo(0, 600 - line[0]);
    context.lineTo(600, 600 - line[1]);
    context.stroke();
    context.restore();
    dots.map((dot) => {
      plotDot(dot);
      return dot;
    });
  }, [line]);

  useEffect(() => {
    if (result.length !== 0) {
      setSampleAdd(false);
      dispatch(answerActions.setTrainState(false));
      setLineMoving(true);
      let positionId;
      const draw = () => {
        setLine((prevState) => {
          if (result[0] < prevLine[0]) {
            if (prevState[0] > result[0]) {
              positionId = requestAnimationFrame(draw);
              return [
                (result[0] - prevLine[0]) / 60 + prevState[0],
                (result[1] - prevLine[1]) / 60 + prevState[1],
              ];
            }
          } else if (result[0] > prevLine[0]) {
            if (prevState[0] < result[0]) {
              positionId = requestAnimationFrame(draw);
              return [
                (result[0] - prevLine[0]) / 60 + prevState[0],
                (result[1] - prevLine[1]) / 60 + prevState[1],
              ];
            }
          }
          setLineMoving(true);
          setPrevLine([prevState[0], prevState[1]]);
          return [prevState[0], prevState[1]];
        });
      };
      positionId = requestAnimationFrame(draw);
      return () => cancelAnimationFrame(positionId);
    }
  }, [result]);

  return <CanvasWrapper ref={canvasRef} width="600" height="600" />;
};

export default Canvas;
