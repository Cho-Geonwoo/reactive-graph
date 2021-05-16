import { answerConstants as types } from '../constants';

function setUserData(userData) {
  return {
    type: types.SET_USER_DATA,
    data: userData,
  };
}

export const answerActions = {
  setUserData,
};
