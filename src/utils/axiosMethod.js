import axios from 'axios'
import { useQuery, useMutation } from 'react-query'

export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

export const postRequest = async (url, body) => {
  let response = await axiosInstance.post(url, body)
  if (response.data.code !== 200) {
    throw new Error(response.data.message || 'Not working')
  }
  return response.data
}

export const updateRequest = async (url, body) => {
  let response = await axiosInstance.update(url, body)
  if (response.status.code !== 200) {
    throw new Error('Not working')
  }
  return response.data
}

export const deleteRequest = async (url, body) => {
  let response = await axiosInstance.delete(url, body)
  if (response.status.code !== 200) {
    throw new Error('Not working')
  }
  return response.data
}

export const getRequest = async (url, params) => {
  let response = await axiosInstance.get(url, { params })
  // if (response.data.code !== 200) {
  //   throw new Error(response.data.message || 'Not working')
  // }
  return response.data
}

export const useToGetRequest = (url, dependency, params) => {
  return useQuery(dependency, () => getRequest(url, params))
}

export const useToPostRequest = (url) => {
  return useMutation((body) => {
    return postRequest(url, body)
  })
}
