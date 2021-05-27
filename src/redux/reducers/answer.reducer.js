import { answerConstants as types } from '../constants';

const initialState = {
  data: [],
  onTrain: false,
};

export function answer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER_DATA:
      return {
        ...state,
        data: action.data,
      };
    case types.SET_TRAIN:
      return {
        ...state,
        onTrain: action.data,
      };
    default:
      return state;
  }
}
