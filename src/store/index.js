import { configureStore } from '@reduxjs/toolkit'
import postSlice from '@/actions/profile'
import isLoggined from '@/actions/signIn'

export const store = configureStore({
  reducer: {
    profile: postSlice,
    isUserLoggined: isLoggined,
  },
})
