import { answerConstants as types } from '../constants';

const initialState = {
  data: [],
};

export function answer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER_DATA:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}
