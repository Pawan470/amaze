import { KEYS } from '@/constants'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { logout } from '@/actions/profile'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { isAuthChanged } from '@/actions/isAuthChange'
import { axiosInstance } from '@/utils/axiosMethod'

export default function useToSignOut() {
  const dispatch = useDispatch()
  const router = useRouter()

  const signOut = () => {
    delete axiosInstance.defaults.headers.common['Authorization']
    dispatch(isAuthChanged())
    sessionStorage.clear()
    localStorage.clear()
    Cookies.remove(KEYS.TOKEN)
    router.push(ROUTES.HOME)
    dispatch(logout())
  }
  return { signOut }
}
