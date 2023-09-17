'use client'

import { SYSTEM_ROLES } from '@/constants'
import { ROUTES } from '@/constants/routes'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Loader from '@/components/shared/Loader'

export const withRoleProtection = (WrappedComponent, allowedRoles = []) => {
  const ComponentWithProtection = (props) => {
    const router = useRouter()
    const profile = useSelector((e) => e.profile?.data) || {}
    const { role } = profile
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      protectedRoutesCheck()
    }, [])

    const protectedRoutesCheck = () => {
      if (role && (!allowedRoles?.length || !allowedRoles.includes(role))) {
        return router.replace(rolesHomepage(role))
      }
      if (!role && allowedRoles?.length) {
        return router.replace(ROUTES.HOME)
      }
      setLoading(false)
    }

    if (loading) return <Loader />
    return <WrappedComponent {...props} router={router} />
  }

  return ComponentWithProtection
}

const rolesHomepage = (role) => {
  if (SYSTEM_ROLES.OWNER === role) return ROUTES.OFFICES
  if (SYSTEM_ROLES.STAFF === role) return ROUTES.STAFF
  return ROUTES.HOME
}
