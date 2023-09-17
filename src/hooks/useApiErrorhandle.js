import { handleError } from '@/utils/utils'
import { useEffect } from 'react'

export default function useApiErrorhandle(error) {
  useEffect(() => {
    error && handleError(error)
  }, [error])

  return null
}
