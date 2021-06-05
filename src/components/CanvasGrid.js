import React from 'react';
import {
  VerticalLine,
  HorizontalLine,
  GridWrapper,
  HorizontalAxis,
  VerticalAxis,
  AxisNumberText,
} from '../styles/styles';

const gridLinePosition = [60, 120, 180, 240, 300, 360, 420, 480, 540];
const gridNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const CanvasGrid = ({ width }) => {
  return (
    <GridWrapper width={width}>
      {gridLinePosition.map((currentValue) => {
        return <VerticalLine left={currentValue} key={currentValue} />;
      })}
      {gridLinePosition.map((currentValue) => {
        return <HorizontalLine top={currentValue} key={currentValue} />;
      })}
      <HorizontalAxis>
        {gridNumber.map((currentValue) => {
          return (
            <AxisNumberText key={currentValue}>{currentValue}</AxisNumberText>
          );
        })}
      </HorizontalAxis>
      <VerticalAxis>
        {gridNumber.map((currentValue) => {
          return (
            <AxisNumberText key={currentValue}>{currentValue}</AxisNumberText>
          );
        })}
      </VerticalAxis>
    </GridWrapper>
  );
};

export default CanvasGrid;
