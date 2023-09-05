import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { KEYS } from '@/constants'
import { getPosts } from '@/actions/profile'
import { axiosInstance } from '@/utils/axiosMethod'
import { handleError } from '@/utils/utils'

export default function useAuth() {
  const dispatch = useDispatch()
  const { loading, error, data } = useSelector((e) => e.profile)
  const isAuth = useSelector((e) => e.isAuth)
  const [isLoading, setIsLoading] = useState(true)

  // This Effect call when user login/logout
  useEffect(() => {
    authSetUp()
  }, [isAuth])

  const authSetUp = async () => {
    try {
      const token = localStorage.getItem(KEYS.TOKEN)
      if (token) {
        // set token for apis
        axiosInstance.defaults.headers.common['Authorization'] = token
        dispatch(getPosts())
      }
    } catch (error) {
      handleError(error)
    }
    setIsLoading(false)
  }

  return {
    isLoading: isLoading || loading,
    isError: error,
    data,
  }
}
