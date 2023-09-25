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
