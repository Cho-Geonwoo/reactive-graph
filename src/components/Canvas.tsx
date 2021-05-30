import React, { useRef, useEffect, useCallback, useState } from 'react';
import * as tfvis from '@tensorflow/tfjs-vis';
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

let model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
model.compile({
  loss: 'meanSquaredError',
  optimizer: 'SGD',
  metrics: ['mse'],
});

type CanvasProps = {
  showSampleDataOne: boolean;
  showSampleDataTwo: boolean;
  clear: boolean;
  setClear: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setShowSampleDataOne: (
    value: boolean | ((prevVar: boolean) => boolean),
  ) => void;
  setShowSampleDataTwo: (
    value: boolean | ((prevVar: boolean) => boolean),
  ) => void;
};

const Canvas = ({
  showSampleDataOne = false,
  showSampleDataTwo = false,
  clear = false,
  setClear,
  setShowSampleDataOne,
  setShowSampleDataTwo,
}: CanvasProps) => {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const context = canvasRef.current && canvasRef.current.getContext('2d');
  const [dots, setDots] = useState<Array<Array<number>>>([]);
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
    setLineMoving(false);
    if (!context || !canvas) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    setDots([]);
    setLine([300, 300]);
    setPrevLine([300, 300]);
    setSampleAdd(false);
  }, []);

  // click event가 발생했을 때 해당 위치에 점을 그리는 함수입니다.
  const addDot = useCallback((event) => {
    if (!lineMoving) {
      if (!context || !canvas) return;
      const rect = canvas.getBoundingClientRect();
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
    if (!context || !canvas) return;
    context.beginPath();
    context.arc(
      dotCoordinate[0] * canvasSize.width,
      canvasSize.height - dotCoordinate[1] * canvasSize.height,
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
      clearCanvas();
      setSampleAdd(true);
      const dotSample: any[] = [];
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
      clearCanvas();
      setSampleAdd(true);
      const dotSample: any[] = [];
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

  // 초기화 버튼을 클릭했을 때, 기존의 모든 점들을 지우고 선의 위치를 중앙으로 초기화하는 함수입니다.
  useEffect(() => {
    if (clear) {
      clearCanvas();
      setClear(false);
    }
  }, [clear]);

  useEffect(() => {
    if (!context || !canvas) return;
    canvas.addEventListener('click', addDot);
  });

  useEffect(() => {
    if (!context || !canvas) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.beginPath();
    context.moveTo(0, canvasSize.height - line[0]);
    context.lineTo(canvasSize.width, canvasSize.height - line[1]);
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
      let positionId: any;
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

  return (
    <CanvasWrapper
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
    />
  );
};

export default Canvas;
