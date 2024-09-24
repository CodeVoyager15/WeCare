import { configureStore } from '@reduxjs/toolkit'
import {reducer} from './rootReducer'

// export const store = configureStore({
//   reducer: {},
// })

//todo: we can make a root reducer and also do the same things 
export const store = configureStore({
    reducer,
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch