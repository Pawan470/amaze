import { KEYS } from '@/constants'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { logout } from '@/actions/profile'
import { useRouter } from 'next/navigation'
import { AUTH_ROUTES } from '@/constants/routes'
import { axiosInstance } from '@/utils/axiosMethod'

export default function useToSignOut() {
  const dispatch = useDispatch()
  const router = useRouter()

  const signOut = () => {
    delete axiosInstance.defaults.headers.common['Authorization']
    dispatch(logout())
    sessionStorage.clear()
    localStorage.clear()
    Cookies.remove(KEYS.TOKEN)
    window.location.reload()
  }
  return { signOut }
}
