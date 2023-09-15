import toast from 'react-hot-toast'

export const handleError = (error, options = {}) => {
  if (typeof error === 'object') {
    return toast.error(error.message, options)
  }
  toast.error(error, options)
}

export const handleSucess = (message = '', options = {}) => {
  return toast.success(message, options)
}

export const setSessionStorage = (key, value) => {
  sessionStorage?.setItem(key, JSON.stringify(value))
}

export const getSessionStorage = (key) => {
  return sessionStorage?.getItem(key)
}

export const removeSessionStorage = (key) => {
  if (Array.isArray(key) && Key?.length) {
    for (let item of key) {
      sessionStorage?.removeItem(item)
    }
  } else {
    sessionStorage?.removeItem(item)
  }
}
