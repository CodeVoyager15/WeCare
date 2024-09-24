// import {reducer} from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'

//todo: we can make a root reducer and also do the same things 
// export const store = configureStore({
//     reducer,
// middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(baseApi.middleware),
//   })

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]:baseApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch