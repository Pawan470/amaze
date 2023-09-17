import { useState, useEffect } from 'react'

export const useDebounce = (value, milliSeconds = 2000, cb) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
      cb && cb()
    }, milliSeconds)

    return () => {
      clearTimeout(handler)
    }
  }, [value, milliSeconds])

  return debouncedValue
}
