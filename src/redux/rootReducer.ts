import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './reducers/AuthSlice';
import { carsSlice } from './reducers/carsSlice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  cars: carsSlice.reducer,
});
