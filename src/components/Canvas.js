import React, { useRef, useEffect, useCallback, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { useDispatch } from 'react-redux';
import { answerActions } from '../redux/actions';
import {
  canvasSize,
  dataSampleOne,
  dataSampleTwo,
} from '../constants/contants';
import { CanvasWrapper } from '../styles/styles';

import useLinearRegression from '../hooks/useLinearRegression';

// model 초기화를 할 수 있도록 let으로 선언했습니다. linear regression을 위해 학습시켜야 하는 모델에 대한 정보입니다.
let model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
model.compile({
  loss: 'meanSquaredError',
  optimizer: 'SGD',
  metrics: ['mse'],
});

const Canvas = ({
  showSampleDataOne = false,
  showSampleDataTwo = false,
  clear = false,
  addedDot,
  setClear,
  setShowSampleDataOne,
  setShowSampleDataTwo,
  setAddedDot,
  setLossHistory,
}) => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const [dots, setDots] = useState([]);
  const [sampleAdd, setSampleAdd] = useState(false);
  const [result, history] = useLinearRegression(dots, model, sampleAdd);
  console.log(history);
  const [prevLine, setPrevLine] = useState([300, 300]);
  const [line, setLine] = useState([300, 300]);
  const [lineMoving, setLineMoving] = useState(false);
  const [trainCount, setTrainCount] = useState(0);
  const reInitializeModel = useCallback(() => {
    model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({
      loss: 'meanSquaredError',
      optimizer: 'SGD',
      metrics: ['mse'],
    });
  }, []);

  // canvas와 관련된 상태들을 초기화하는 함수다.
  const clearCanvas = useCallback(() => {
    reInitializeModel();
    setLineMoving(false);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    setDots([]);
    setLine([300, 300]);
    setPrevLine([300, 300]);
    setSampleAdd(false);
  }, []);

  // click event가 발생했을 때 해당 위치에 점을 그리는 함수다.
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
      context.fillStyle = '#15baf2';
      context.strokeStyle = '#15baf2';
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
      dotCoordinate[0] * canvasSize.width,
      canvasSize.height - dotCoordinate[1] * canvasSize.height,
      5,
      0,
      2 * Math.PI,
      false,
    );
    context.fillStyle = '#15baf2';
    context.strokeStyle = '#15baf2';
    context.fill();
    context.stroke();
  }, []);

  // 입력 버튼을 눌러 점에 대한 정보를 받았을 때, 캔버스에 점을 찍는 부분이다.
  useEffect(() => {
    if (addedDot.length !== 0) {
      plotDot(addedDot);
      dispatch(answerActions.setTrainState(true));
      setDots((prevArray) => [...prevArray, addedDot]);
      setAddedDot([]);
    }
  }, [addedDot]);

  // 샘플 데이터1 버튼을 클릭했을 때, dataSampleOne 배열에 있는 점들을 캔버스에 추가하는 액션이다.
  useEffect(() => {
    if (showSampleDataOne) {
      clearCanvas();
      setSampleAdd(true);
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

  // 샘플 데이터2 버튼을 클릭했을 때, dataSampleTwo 배열에 있는 점들을 캔버스에 추가하는 액션이다.
  useEffect(() => {
    if (showSampleDataTwo) {
      clearCanvas();
      setSampleAdd(true);
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

  // 초기화 버튼을 클릭했을 때, 기존의 모든 점들을 지우고 선의 위치를 중앙으로 초기화하는 함수다.
  useEffect(() => {
    if (clear) {
      clearCanvas();
      setClear(false);
      setLossHistory([]);
    }
  }, [clear]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener('click', addDot);
  });

  // 캔버스 그려야 하는 선에 대한 정보가 변했을 때 해당 정보에 맞춰 선을 그려주는 부분이다.
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.beginPath();
    context.moveTo(0, canvasSize.height - line[0]);
    context.strokeStyle = '#15baf2';
    context.lineWidth = 2;
    context.shadowColor = 'rgba(0,0,0,0.25)';
    context.shadowBlur = 4;
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 1;
    context.lineTo(canvasSize.width, canvasSize.height - line[1]);
    context.stroke();
    context.restore();
    dots.map((dot) => {
      plotDot(dot);
      return dot;
    });
  }, [line]);

  // 학습이 완료됐을 때, 학습 정보에 따라 requestAnimationFrame을 활용해 linear regression animation을 발생시키는 부분이다.
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

  useEffect(() => {
    if (history) {
      setLossHistory(history);
    }
  }, [history]);

  return (
    <CanvasWrapper
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
    />
  );
};

export default Canvas;
