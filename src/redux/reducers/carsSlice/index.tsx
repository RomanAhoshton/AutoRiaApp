import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCars } from '../../../API/cars';

import { RootState } from '../../store';
import { Car } from '../../../API/types';

export const fetchListOfCars = createAsyncThunk('cars/', async () => {
  const response = await getCars();

  return response;
});

type CarsState = {
  carList: Array<Car>;

  queryStatuses: {
    fetchListOfCars: boolean;
  };
};

const CarsState: CarsState = {
  carList: [],

  queryStatuses: {
    fetchListOfCars: false,
  },
};

export const carsSlice = createSlice({
  name: 'cars',
  initialState: CarsState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchListOfCars.pending, state => {
        state.queryStatuses.fetchListOfCars = true;
      })
      .addCase(fetchListOfCars.rejected, state => {
        state.queryStatuses.fetchListOfCars = false;
      })
      .addCase(fetchListOfCars.fulfilled, (state, action) => {
        if (action?.payload?.data) {
          state.carList = action?.payload?.data;
        }
        state.queryStatuses.fetchListOfCars = false;
      });
  },
});

export const selectCarList = (state: RootState) => state.cars.carList;
export const selectCarListQueryStatuses = (state: RootState) =>
  state.cars.queryStatuses.fetchListOfCars;
