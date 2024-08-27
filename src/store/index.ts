import { configureStore, Tuple } from '@reduxjs/toolkit'
import { zodiacApi } from './api';
import appReducer from './app'

export const store = configureStore({
    reducer: {
      [zodiacApi.reducerPath]: zodiacApi.reducer,
      app: appReducer,
    },
    middleware(getDefaultMiddleware) {
      return new Tuple(...getDefaultMiddleware(), zodiacApi.middleware )
    },
  });


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
