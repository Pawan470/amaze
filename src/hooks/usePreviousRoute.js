import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const usePreviousRoute = () => {
  const pathName = usePathname()
  const prevPath = sessionStorage.getItem('prevPath')
  const currentPath = sessionStorage.getItem('currentPath')
  const router = useRouter()

  useEffect(() => storePathValues, [pathName])

  function storePathValues() {
    if (pathName !== prevPath || !prevPath) {
      sessionStorage.setItem('prevPath', pathName)
    }

    sessionStorage.setItem('currentPath', pathName)
  }

  return {
    prevPath,
    currentPath,
  }
}

export default usePreviousRoute
