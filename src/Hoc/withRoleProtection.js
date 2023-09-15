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
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      protectionCheck()
    }, [])

    const rolesHomepage = () => {
      let page = '/'
      if (SYSTEM_ROLES.OWNER === profile.role) page = ROUTES.OFFICES
      if (SYSTEM_ROLES.STAFF === profile.role) page = ROUTES.STAFF
      return page
    }

    const protectionCheck = () => {
      if (!profile?.role && allowedRoles?.length) {
        return router.replace(ROUTES.HOME)
      }

      if (profile?.role && !allowedRoles.includes(profile?.role)) {
        return router.replace(rolesHomepage())
      }

      setLoading(false)
    }

    if (loading) return <Loader />
    return <WrappedComponent {...props} router={router} />
  }

  return ComponentWithProtection
}
