import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';

import useLinearRegression from '../hooks/useLinearRegression';

const CanvasWrapper = styled.canvas`
  border: 2px solid;
`;

const Canvas = () => {
  const canvasRef = useRef(null);
  const [dots, setDots] = useState([]);
  const result = useLinearRegression(dots);
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
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener('click', addDot);
  });
  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    console.log(result);
    context.beginPath();
    context.moveTo(0, 600 - result[0]);
    context.lineTo(600, 600 - result[1]);
    context.stroke();
  }, [result]);
  return <CanvasWrapper ref={canvasRef} width="600" height="600" />;
};

export default Canvas;
