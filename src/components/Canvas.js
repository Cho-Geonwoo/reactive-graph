import React, { useRef, useEffect, useCallback, useState } from 'react';
import * as tfvis from '@tensorflow/tfjs-vis';
import styled from 'styled-components';

import useLinearRegression from '../hooks/useLinearRegression';

const CanvasWrapper = styled.canvas`
  border: 2px solid;
`;

const dataSampleOne = [
  [0, 0],
  [1 / 6, 1 / 6],
  [1 / 3, 1 / 3],
  [1 / 2, 1 / 2],
  [2 / 3, 2 / 3],
  [5 / 6, 5 / 6],
  [1, 1],
];

const dataSampleTwo = [
  [0, 1],
  [1 / 6, 5 / 6],
  [1 / 3, 2 / 3],
  [1 / 2, 1 / 2],
  [2 / 3, 1 / 3],
  [5 / 6, 1 / 6],
  [1, 0],
];

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
  const canvasRef = useRef(null);
  const [dots, setDots] = useState([]);
  const [result, history] = useLinearRegression(dots);
  const [prevLine, setPrevLine] = useState([300, 300]);
  const [line, setLine] = useState([300, 300]);
  const surface = { name: 'Training Performance', tab: 'history' };
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    setDots([]);
  }, []);

  const addDot = useCallback((event) => {
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
  }, []);

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

  useEffect(() => {
    if (showSampleDataOne) {
      clearCanvas();
      const dotSample = [];
      dataSampleOne.map((dot) => {
        plotDot(dot);
        dotSample.push(dot);
        return dot;
      });
      setDots(dotSample);
      setShowSampleDataOne(false);
    }
  }, [showSampleDataOne]);

  useEffect(() => {
    if (showSampleDataTwo) {
      clearCanvas();
      const dotSample = [];
      dataSampleTwo.map((dot) => {
        plotDot(dot);
        dotSample.push(dot);
        return dot;
      });
      setDots(dotSample);
      setShowSampleDataTwo(false);
    }
  }, [showSampleDataTwo]);

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
      let positionId;
      const draw = () => {
        setLine((prevState) => {
          if (prevState[0] !== result[0]) {
            positionId = requestAnimationFrame(draw);
            return [
              (result[0] - prevLine[0]) / 60 + prevState[0],
              (result[1] - prevLine[1]) / 60 + prevState[1],
            ];
          }
          setPrevLine([prevState[0], prevState[1]]);
          return [prevState[0], prevState[1]];
        });
      };
      positionId = requestAnimationFrame(draw);
      return () => cancelAnimationFrame(positionId);
    }
  }, [result]);

  useEffect(() => {
    if (showTrain && history.length !== 0) {
      tfvis.show.history(surface, history, ['loss']);
      setShowTrain(false);
    }
    if (showTrain && history.length === 0) {
      alert('진행된 학습이 없습니다.');
      setShowTrain(false);
    }
  }, [showTrain]);
  return <CanvasWrapper ref={canvasRef} width="600" height="600" />;
};

export default Canvas;
