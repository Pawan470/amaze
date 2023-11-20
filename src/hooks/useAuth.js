import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { KEYS } from '@/constants'
import { getProfile } from '@/actions/profile'
import { axiosInstance } from '@/utils/axiosMethod'
import { handleError } from '@/utils/utils'
import useToSignOut from './useToSignOut'
import Cookies from 'js-cookie'

export default function useAuth() {
  const dispatch = useDispatch()
  const { loading, error, data } = useSelector((e) => e.profile)
  const isUserLoggined = useSelector((e) => e.isUserLoggined)

  const [isLoading, setIsLoading] = useState(true)
  const { signOut } = useToSignOut()

  // This Effect call when user login/logout
  useEffect(() => {
    authSetUp()
  }, [isUserLoggined])

  const authSetUp = async () => {
    try {
      let token = localStorage.getItem(KEYS.TOKEN)
      if (!token && isUserLoggined.isLoading) {
        setIsLoading(false)
        return
      }

      if (!token && isUserLoggined.token && !isUserLoggined.error) {
        token = isUserLoggined.token
        localStorage.setItem(KEYS.TOKEN, token)
        Cookies.set(KEYS.TOKEN, token, { expires: 1 })
      }

      if (token) {
        // set token for apis
        axiosInstance.defaults.headers.common['Authorization'] = token
        axiosInstance.interceptors.response.use(
          function (response) {
            return response
          },
          function (error) {
            if (error.response.status === 401) {
              signOut()
            }
            return Promise.reject(error)
          },
        )

        dispatch(getProfile())
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
