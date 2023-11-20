import { AUTH_SERVICE } from '@/services'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postRequest } from '@/utils/axiosMethod'

const initialState = {
  isLoading: false,
  token: null,
  error: null,
}

export const isLoggined = createAsyncThunk(AUTH_SERVICE.LOGIN, async (params) => {
  try {
    let response = await postRequest(AUTH_SERVICE.LOGIN, params)
    return response?.token
  } catch (error) {
    return Promise.reject(error)
  }
})

export const loginUser = createSlice({
  name: 'SING_IN',
  initialState,
  reducers: {
    resetSignIn: (state) => {
      state.isLoading = false
      state.token = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(isLoggined.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(isLoggined.fulfilled, (state, action) => {
      state.isLoading = false
      state.token = action.payload
    })

    builder.addCase(isLoggined.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
  },
})

export default loginUser.reducer
