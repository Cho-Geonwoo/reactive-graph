import { answerConstants as types } from '../constants';

function setTrainState(userData) {
  return {
    type: types.SET_TRAIN,
    data: userData,
  };
}

export const answerActions = {
  setTrainState,
};
