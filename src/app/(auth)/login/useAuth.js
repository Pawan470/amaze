import { KEYS } from '@/constants'
import { AUTH_SERVICE } from '@/services'
import { postRequest } from '@/utils/axiosMethod'
import { handleError, handleSucess } from '@/utils/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { isAuthChanged } from '@/actions/isAuthChange'

export default function useAuth() {
  const [formFields, setFormFields] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const onChange = (event) => {
    setFormFields((pre) => ({ ...pre, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      let response = await postRequest(AUTH_SERVICE.LOGIN, formFields)
      localStorage.setItem(KEYS.TOKEN, response.token)
      Cookies.set(KEYS.TOKEN, response.token, { expires: 1 })
      handleSucess(response.message)
      dispatch(isAuthChanged())
    } catch (err) {
      handleError(err)
    }
    setIsLoading(false)
  }

  return {
    values: formFields,
    isLoading,
    methods: { onChange, handleSubmit },
  }
}
