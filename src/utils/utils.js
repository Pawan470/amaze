import toast from 'react-hot-toast'

export const handleError = (error, options = {}) => {
  return toast.error(error.message, options)
}

export const handleSucess = (message = '', options = {}) => {
  return toast.success(message, options)
}
