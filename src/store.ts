import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import viewStates from 'reducers/viewStates';
import assets from 'reducers/assets';

const store = createStore(
  combineReducers({viewStates, assets}),
  applyMiddleware(thunkMiddleware)
);

export default store;
