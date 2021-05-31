import React, { useState, useEffect } from 'react';
import {
  Label,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const LossGraph = ({ lossHistory }) => {
  const [data, setData] = useState([]);

  // loss에 대한 정보가 갱신 되었을 때 해당 정보를 그래프에 반영할 수 있도록 가공하는 부분입니다.
  useEffect(() => {
    if (lossHistory.length !== 0) {
      const dataArray = [];
      if (lossHistory.length <= 100) {
        lossHistory.map((loss, index) => {
          return dataArray.push({ name: index, mse: loss });
        });
      } else {
        lossHistory.map((loss, index) => {
          if (index % 20 === 0) {
            return dataArray.push({ name: index, mse: loss });
          }
          return dataArray;
        });
      }
      setData(dataArray);
    }
  }, [lossHistory]);

  return (
    <div style={{ userSelect: 'none', width: '100%', margin: '0 0 0 10px' }}>
      <ResponsiveContainer width="90%" height={400}>
        <LineChart width="90%" height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis allowDataOverflow dataKey="name" type="number">
            <Label value="Epoch" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis
            allowDataOverflow
            type="number"
            yAxisId="1"
            label={{
              value: 'MSE Loss',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
            }}
          />
          <Tooltip />
          <Line
            yAxisId="1"
            type="natural"
            dataKey="mse"
            stroke="#8884d8"
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LossGraph;
