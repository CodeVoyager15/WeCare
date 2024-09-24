// import {reducer} from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]:baseApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

//todo: we can make a root reducer and also do the same things 
// export const store = configureStore({
//     reducer,
//   })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch