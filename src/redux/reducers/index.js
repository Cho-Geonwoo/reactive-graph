import { combineReducers } from 'redux';

import { answer } from './answer.reducer';

const rootReducer = combineReducers({
  answer,
});

export default rootReducer;
