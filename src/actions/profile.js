import { AUTH_SERVICE } from '@/services'
import { getRequest } from '@/utils/axiosMethod'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  loading: false,
  error: null,
}

export const getPosts = createAsyncThunk('get/Get_Profile', async () => {
  try {
    let response = await getRequest(AUTH_SERVICE.GET_PROFILE)
    return response?.data
  } catch (error) {
    return Promise.reject(error)
  }
})

export const postSlice = createSlice({
  name: 'Get_Profile',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = {}
    },

    addData: (state, action) => {
      state.data = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })

    builder.addCase(getPosts.rejected, (state, action) => {
      state.loading = false
      state.error = action.error
    })
  },
})

// export const postReducer = postSlice.reducer
export const { logout, addData } = postSlice.actions
export default postSlice.reducer
