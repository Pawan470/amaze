import { config } from '@/config/config'

const baseURl = config.baseURl

export const AUTH_SERVICE = {
  LOGIN: `${baseURl}auth/login`,
  GET_PROFILE: `${baseURl}auth/profile`,
}
