import React, { PureComponent } from 'react';
import {
  Label,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts';

const initialData = [
  { name: 1, cost: 4.11 },
  { name: 2, cost: 2.39 },
  { name: 3, cost: 1.37 },
  { name: 4, cost: 1.16 },
  { name: 5, cost: 2.29 },
  { name: 6, cost: 3 },
  { name: 7, cost: 0.53 },
  { name: 8, cost: 2.52 },
  { name: 9, cost: 1.79 },
  { name: 10, cost: 2.94 },
  { name: 11, cost: 4.3 },
  { name: 12, cost: 4.41 },
  { name: 13, cost: 2.1 },
  { name: 14, cost: 8 },
  { name: 15, cost: 0 },
  { name: 16, cost: 9 },
  { name: 17, cost: 3 },
  { name: 18, cost: 2 },
  { name: 19, cost: 3 },
  { name: 20, cost: 7 },
];

const initialState = {
  data: initialData,
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
  top: 'dataMax+1',
  bottom: 'dataMin-1',
  top2: 'dataMax+20',
  bottom2: 'dataMin-20',
  animation: true,
};

export default class LossGraph extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    const { data, left, right, refAreaLeft, refAreaRight, top, bottom } =
      this.state;

    return (
      <div style={{ userSelect: 'none', width: '100%', margin: '0 auto' }}>
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
                offset: 20,
              }}
            />
            <Tooltip />
            <Line
              yAxisId="1"
              type="natural"
              dataKey="cost"
              stroke="#8884d8"
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
