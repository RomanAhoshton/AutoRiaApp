import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { UserLogin, CreateNewUser } from '../../../API/types';
import {
  login as loginUserAction,
  createUser as createUserAction,
} from '../../../API/queries';
import { RootState } from '../../store';
import { DEFAULT_LOCALE } from '../../../constants';
import { TranslationKey } from '../../../translations/types';

type InitialUserState = {
  token: string | null;
  currentLanguage: TranslationKey;
  queryStatuses: {
    fetchLoginUser: boolean;
    fetchCreateUser: boolean;
  };
  errorMessage: string | null | object;
};

const initialUserState: InitialUserState = {
  token: null,
  currentLanguage: DEFAULT_LOCALE,
  queryStatuses: {
    fetchLoginUser: false,
    fetchCreateUser: false,
  },

  errorMessage: null,
};

export const fetchLoginUser = createAsyncThunk(
  'users/login',
  async (payload: UserLogin) => {
    const response = await loginUserAction(payload);

    return response;
  },
);
export const fetchCreateUser = createAsyncThunk(
  'users/create',
  async (payload: CreateNewUser, { rejectWithValue }) => {
    try {
      const response = await createUserAction(payload);
      return response.data;
    } catch (error: any) {
      if (error) return rejectWithValue(error.response.data);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialUserState,
  reducers: {
    logoutUser: (state: InitialUserState) => {
      state.token = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLoginUser.pending, state => {
        state.queryStatuses.fetchLoginUser = true;
      })
      .addCase(fetchLoginUser.rejected, state => {
        state.queryStatuses.fetchLoginUser = false;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        if (action?.payload?.data?.access) {
          state.token = action?.payload?.data?.access;
        }
        state.queryStatuses.fetchLoginUser = false;
      })
      .addCase(fetchCreateUser.pending, state => {
        state.queryStatuses.fetchCreateUser = true;
      })
      .addCase(fetchCreateUser.rejected, (state, action: AnyAction) => {
        state.queryStatuses.fetchCreateUser = false;
        if (action.payload) {
          const response = action.payload;
          const keys = Object.keys(response);
          const errorKeys = response[keys[0]];
          // eslint-disable-next-line prefer-destructuring
          state.errorMessage = errorKeys[0];
        }
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        if (action?.payload?.data?.access) {
          state.token = action?.payload?.data?.access;
        }
        state.queryStatuses.fetchCreateUser = false;
      });
  },
});
export const selectCreateUserErrorMessage = (state: RootState) =>
  state.auth.errorMessage;
export const selectToken = (state: RootState) => state.auth.token;
export const selectAuthLoginQueryStatuses = (state: RootState) =>
  state.auth.queryStatuses.fetchLoginUser;
export const selectAuthCreateUserQueryStatuses = (state: RootState) =>
  state.auth.queryStatuses.fetchCreateUser;
export const getCurrentLanguage = (store: RootState) =>
  store.auth.currentLanguage;
export const { logoutUser } = authSlice.actions;
