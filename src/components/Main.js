import React, { useState, useRef, useEffect } from 'react';
// import {
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
import Canvas from './Canvas';
import CanvasGrid from './CanvasGrid';
import {
  // ScatterChartWrapper,
  ContentWrapper,
  ContentOneWrapper,
  ContentTwoWrapper,
  TitleWrapper,
  Blank,
  SampleDataWrapper,
  SampleDataButton,
  InitializeButton,
  TotalWrapper,
  GraphWrapper,
  InputWrapper,
  InputText,
  GridBox,
  VariableText,
  InputBox,
  InputButton,
  GraphTitle,
  EasyDeepImg,
} from '../styles/styles';

const Main = () => {
  const [showSampleDataOne, setShowSampleDataOne] = useState(false);
  const [showSampleDataTwo, setShowSampleDataTwo] = useState(false);
  const [clear, setClear] = useState(false);
  const [inputs, setInputs] = useState({
    x: null,
    y: null,
  });
  const [addedDot, setAddedDot] = useState([]);
  const [lossHistory, setLossHistory] = useState(null);

  // x inputBox에 대한 reference
  const xInput = useRef();

  // y inputBox에 대한 reference
  const yInput = useRef();

  // 화면 처음 렌더링 됐을 때 focus가 x input 부분에 맞춰지도록 설정
  useEffect(() => {
    xInput.current.focus();
  }, [xInput]);

  // 초기화 버튼 클릭 시 x input 부분 커서 깜빡임
  useEffect(() => {
    if (clear) {
      xInput.current.focus();
    }
  }, [clear, xInput]);

  // x, y input 부분에 변화가 있으면 input 변수의 값을 재설정한다.
  const onChange = (e) => {
    const { value, name } = e.target;
    if (value && Number.isInteger(Number(value))) {
      setInputs({
        ...inputs,
        [name]: Number(value),
      });
    } else {
      setInputs({
        ...inputs,
        [name]: null,
      });
    }
  };

  // 입력 버튼을 눌렀을 때, x input과 y input안에 제대로 된 숫자 값이 있으면 addedDot 변수의 값을 해당 좌표의 값으로 설정하는 부분이다.
  const addDotByInput = () => {
    if (!Number.isInteger(inputs.x) || inputs.x < 0 || inputs.x > 10) {
      alert('올바른 x값을 입력하세요!');
      xInput.current.value = '';
      yInput.current.value = '';
      setInputs({
        x: null,
        y: null,
      });
      return;
    }
    if (!Number.isInteger(inputs.y) || inputs.y < 0 || inputs.y > 10) {
      alert('올바른 y값을 입력하세요!');
      xInput.current.value = '';
      yInput.current.value = '';
      setInputs({
        x: null,
        y: null,
      });
      return;
    }
    setAddedDot([inputs.x / 10, inputs.y / 10]);
    xInput.current.value = '';
    yInput.current.value = '';
    setInputs({
      x: null,
      y: null,
    });
  };

  return (
    <TotalWrapper>
      <ContentWrapper>
        <ContentOneWrapper>
          <TitleWrapper>선형 회귀 실습</TitleWrapper>
          <CanvasGrid />
          <Canvas
            showSampleDataOne={showSampleDataOne}
            showSampleDataTwo={showSampleDataTwo}
            clear={clear}
            addedDot={addedDot}
            lossHistory={lossHistory}
            setClear={setClear}
            setShowSampleDataOne={setShowSampleDataOne}
            setShowSampleDataTwo={setShowSampleDataTwo}
            setAddedDot={setAddedDot}
            setLossHistory={setLossHistory}
          />
          <SampleDataWrapper>
            <SampleDataButton
              onClick={() => setShowSampleDataOne(true)}
              left={140}
            >
              샘플 데이터 1
            </SampleDataButton>
            <SampleDataButton
              onClick={() => setShowSampleDataTwo(true)}
              left={20}
            >
              샘플 데이터 2
            </SampleDataButton>
          </SampleDataWrapper>
          <Blank />
        </ContentOneWrapper>
        <ContentTwoWrapper>
          <InputWrapper>
            <InputText>데이터 입력</InputText>
            <GridBox>
              <VariableText style={{ gridColumn: 1, gridRow: 1 }}>
                x:
              </VariableText>
              <InputBox
                name="x"
                placeholder="0~10"
                style={{ gridColumn: 2, gridRow: 1 }}
                ref={xInput}
                onChange={onChange}
              />
              <VariableText
                style={{ gridColumn: 1, gridRow: 2, marginTop: '10px' }}
              >
                y:
              </VariableText>
              <InputBox
                name="y"
                placeholder="0~10"
                style={{ gridColumn: 2, gridRow: 2, marginTop: '10px' }}
                ref={yInput}
                onChange={onChange}
              />
            </GridBox>
            <InputButton onClick={addDotByInput}>입력</InputButton>
          </InputWrapper>
          <InitializeButton onClick={() => setClear(true)}>
            초기화
          </InitializeButton>
        </ContentTwoWrapper>
      </ContentWrapper>
      <GraphWrapper>
        <GraphTitle>학습 정보</GraphTitle>
        <EasyDeepImg src={`${process.env.PUBLIC_URL}/images/easydeep.png`} />
      </GraphWrapper>
    </TotalWrapper>
  );
};

export default React.memo(Main);
