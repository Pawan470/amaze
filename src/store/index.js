import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/actions/counter'
import postSlice from '@/actions/profile'
import isAuthChange from '@/actions/isAuthChange'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    profile: postSlice,
    isAuth: isAuthChange,
  },
})
