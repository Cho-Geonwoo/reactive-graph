import { answerConstants as types } from '../constants';

function setUserData(userData) {
  return {
    type: types.SET_USER_DATA,
    data: userData,
  };
}

function setTrainState(userData) {
  return {
    type: types.SET_TRAIN,
    data: userData,
  };
}

export const answerActions = {
  setUserData,
  setTrainState,
};
