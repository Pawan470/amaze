import { createSlice } from '@reduxjs/toolkit'

const isAuthChange = createSlice({
  name: 'IS_AUTH_CHANGED',
  initialState: false,
  reducers: {
    isAuthChanged: (state) => {
      return !state
    },
  },
})

export const { isAuthChanged } = isAuthChange.actions
export default isAuthChange.reducer
