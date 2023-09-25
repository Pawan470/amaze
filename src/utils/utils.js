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

export const decodeId = (encodedId) => {
  return encodedId
  // try {
  //   if (!encodedId) return encodedId
  //   return decodeURIComponent(escape(window.atob(encodedId)))
  // } catch (error) {
  //   // window.location.replace(window.location.origin + '/404')
  // }
}

export const encodeId = (id) => {
  // return window.btoa(unescape(encodeURIComponent(id)))
  return id
}

export const mergeUrlWithParams = (baseUrl, paramsObj) => {
  baseUrl = baseUrl.endsWith('?') || baseUrl.endsWith('/') ? baseUrl : baseUrl + '?'

  const queryString = Object.keys(paramsObj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObj[key])}`)
    .join('&')

  return baseUrl + queryString
}

export const isValueExist = (value) => {
  if (value) return value
  return '--'
}

export const debounce = (cb, timer) => {
  try {
    let isTimer
    return (arg) => {
      if (isTimer) clearTimeout(isTimer)
      isTimer = setTimeout(() => {
        cb(arg)
        isTimer = null
      }, timer)
    }
  } catch (error) {
    handleError(error)
  }
}
