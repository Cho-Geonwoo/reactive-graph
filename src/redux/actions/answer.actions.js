import { answerConstants as types } from '../constants';

export const answerActions = {
  setUserData,
};

function setUserData(userData) {
  return {
    type: types.SET_USER_DATA,
    data: userData,
  };
}
