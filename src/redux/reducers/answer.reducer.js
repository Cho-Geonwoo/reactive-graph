import { answerConstants as types } from '../constants';

const initialState = {
  onTrain: false,
};

export function answer(state = initialState, action) {
  switch (action.type) {
    // 학습 상태를 관리하기 위한 부분입니다.
    case types.SET_TRAIN:
      return {
        ...state,
        onTrain: action.data,
      };
    default:
      return state;
  }
}
