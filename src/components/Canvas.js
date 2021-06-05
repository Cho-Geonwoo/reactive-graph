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
  width,
  isMobile = false,
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
  const [sampleModelOneExists, setSampleModelOneExists] = useState(false);
  const [sampleModelTwoExists, setSampleModelTwoExists] = useState(false);
  const [sampleNumber, setSampleNumber] = useState(1);
  const [result, history] = useLinearRegression(
    dots,
    model,
    sampleAdd,
    isMobile,
    width,
    sampleNumber,
  );
  const [prevLine, setPrevLine] = isMobile
    ? useState([0.35 * width, 0.35 * width])
    : useState([300, 300]);
  const [line, setLine] = isMobile
    ? useState([0.35 * width, 0.35 * width])
    : useState([300, 300]);
  const [lineMoving, setLineMoving] = useState(false);

  //모델을 초기화하는 함수
  const reInitializeModel = useCallback(() => {
    model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({
      loss: 'meanSquaredError',
      optimizer: 'SGD',
      metrics: ['mse'],
    });
  }, []);

  //IndexedDB안에 이미 훈련된 모델이 있나 확인하는 부분
  const checkIndexedDB = useCallback(
    (name) => {
      if (dots.length > 2) {
        const req = indexedDB.open('tensorflowjs', 1);
        let db;
        req.onsuccess = () => {
          db = req.result;
          try {
            const store = db
              .transaction(['model_info_store'], 'readonly')
              .objectStore('model_info_store');
            let request = store.openCursor();
            request.onsuccess = (e) => {
              const cursor = e.target.result;
              if (cursor) {
                request = store.get(cursor.key);
                request.onsuccess = (event) => {
                  const value = event.target.result;
                  if (name === value.modelPath) {
                    if (name === 'sample1') {
                      setSampleModelOneExists(true);
                    }
                    if (name === 'sample2') {
                      setSampleModelTwoExists(true);
                    }
                  }
                };
                cursor.continue();
              }
            };
          } catch (error) {
            setSampleModelOneExists(false);
            setSampleModelOneExists(false);
          }
        };
      }
    },
    [result],
  );

  useEffect(() => {
    checkIndexedDB('sample1');
    checkIndexedDB('sample2');
  }, [result]);

  // canvas와 관련된 상태들을 초기화하는 함수다.
  const clearCanvas = useCallback(() => {
    setLineMoving(false);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    setDots([]);
    if (!isMobile) {
      setLine([300, 300]);
      setPrevLine([300, 300]);
    } else {
      setLine([0.35 * width, 0.35 * width]);
      setPrevLine([0.35 * width, 0.35 * width]);
    }
    setSampleAdd(false);
  }, [isMobile]);

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
    if (!isMobile) {
      context.arc(
        dotCoordinate[0] * canvasSize.width,
        canvasSize.height - dotCoordinate[1] * canvasSize.height,
        5,
        0,
        2 * Math.PI,
        false,
      );
    } else {
      context.arc(
        dotCoordinate[0] * 0.7 * width,
        0.7 * width - dotCoordinate[1] * 0.7 * width,
        5,
        0,
        2 * Math.PI,
        false,
      );
    }
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
  useEffect(async () => {
    if (showSampleDataOne) {
      setShowSampleDataOne(false);
      setLossHistory([]);
      setSampleNumber(1);
      clearCanvas();
      if (sampleModelOneExists) {
        model = await tf.loadLayersModel('indexeddb://sample1');
        model.compile({
          loss: 'meanSquaredError',
          optimizer: 'SGD',
          metrics: ['mse'],
        });
        setSampleAdd(false);
      } else {
        reInitializeModel();
        setSampleAdd(true);
      }
      const dotSample = [];
      dataSampleOne.map((dot) => {
        plotDot(dot);
        dotSample.push(dot);
        return dot;
      });
      dispatch(answerActions.setTrainState(true));
      setDots(dotSample);
    }
  }, [showSampleDataOne]);

  // 샘플 데이터2 버튼을 클릭했을 때, dataSampleTwo 배열에 있는 점들을 캔버스에 추가하는 액션이다.
  useEffect(async () => {
    if (showSampleDataTwo) {
      setShowSampleDataTwo(false);
      setLossHistory([]);
      setSampleNumber(2);
      clearCanvas();
      if (sampleModelTwoExists) {
        model = await tf.loadLayersModel('indexeddb://sample2');
        model.compile({
          loss: 'meanSquaredError',
          optimizer: 'SGD',
          metrics: ['mse'],
        });
        setSampleAdd(false);
      } else {
        reInitializeModel();
        setSampleAdd(true);
      }
      const dotSample = [];
      dataSampleTwo.map((dot) => {
        plotDot(dot);
        dotSample.push(dot);
        return dot;
      });
      dispatch(answerActions.setTrainState(true));
      setDots(dotSample);
    }
  }, [showSampleDataTwo]);

  // 초기화 버튼을 클릭했을 때, 기존의 모든 점들을 지우고 선의 위치를 중앙으로 초기화하는 함수다.
  useEffect(() => {
    if (clear) {
      reInitializeModel();
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
    if (!isMobile) {
      context.moveTo(0, canvasSize.height - line[0]);
    } else {
      context.moveTo(0, 0.7 * width - line[0]);
    }
    context.strokeStyle = '#15baf2';
    context.lineWidth = 2;
    context.shadowColor = 'rgba(0,0,0,0.25)';
    context.shadowBlur = 4;
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 1;
    if (!isMobile) {
      context.lineTo(canvasSize.width, canvasSize.height - line[1]);
    } else {
      context.lineTo(0.7 * width, 0.7 * width - line[1]);
    }
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
      width={isMobile ? 0.7 * width : canvasSize.width}
      height={isMobile ? 0.7 * width : canvasSize.height}
    />
  );
};

export default Canvas;
