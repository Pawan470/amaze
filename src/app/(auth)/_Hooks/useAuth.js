import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggined } from '@/actions/signIn'
import useApiErrorhandle from '@/hooks/useApiErrorhandle'

export default function useAuth() {
  const [formFields, setFormFields] = useState({ email: '', password: '' })
  const loginUser = useSelector((pre) => pre.isUserLoggined)
  const dispatch = useDispatch()
  useApiErrorhandle(loginUser.error)

  const onChange = (event) => {
    setFormFields((pre) => ({ ...pre, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async () => {
    dispatch(isLoggined(formFields))
  }

  return {
    values: formFields,
    isLoading: loginUser.isLoading,
    methods: { onChange, handleSubmit },
  }
}
