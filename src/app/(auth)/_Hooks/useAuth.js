import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggined } from '@/actions/signIn'
import useApiErrorhandle from '@/hooks/useApiErrorhandle'
import { handleError } from '@/utils/utils'

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )
}

export default function useAuth() {
  const [formFields, setFormFields] = useState({ email: '', password: '' })
  const [error, setError] = useState({})

  const loginUser = useSelector((pre) => pre.isUserLoggined)
  const dispatch = useDispatch()
  useApiErrorhandle(loginUser.error)

  const onChange = (event) => {
    if (loginUser.isLoading) return
    const { name, value } = event.target
    setFormFields((pre) => ({ ...pre, [name]: value }))
    onChangeValidateForm(name, value)
  }

  const onChangeValidateForm = (name, value) => {
    let errorDeepCopy = structuredClone(error)
    if (name === 'email') {
      errorDeepCopy['email'] = !validateEmail(value) ? 'not valid email' : null
    }

    if (name === 'password') {
      errorDeepCopy['password'] = !value?.trim()?.length ? 'Please enter Password' : null
    }

    setError(errorDeepCopy)
  }

  const handleSubmit = () => {
    const { email, password } = formFields
    if (!email || !password) {
      handleError('Fill all manditory fields')
      return
    }
    dispatch(isLoggined(formFields))
  }

  return {
    values: formFields,
    error,
    isLoading: loginUser.isLoading,
    methods: { onChange, handleSubmit },
  }
}
