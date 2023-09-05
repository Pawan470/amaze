'use client'
import { SYSTEM_ROLES } from '@/constants'
import { AUTH_ROUTES, ROUTES } from '@/constants/routes'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Fragment, useEffect, useState } from 'react'

export const withRoleProtection = (WrappedComponent, allowedRoles = []) => {
  const ComponentWithProtection = (props) => {
    const currentPath = usePathname()
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
      if (profile?.role && !allowedRoles.includes(profile?.role)) {
        return router.replace(rolesHomepage())
      }

      setLoading(false)
    }

    if (loading) return null
    return <WrappedComponent {...props} router={router} />
  }

  return ComponentWithProtection
}

// if (profile?.role && currentPath === AUTH_ROUTES.LOGIN) {
//   if (SYSTEM_ROLES.OWNER === profile.role) {
//     return router.replace(ROUTES.OFFICES)
//   }

//   if (SYSTEM_ROLES.STAFF === profile.role) {
//     return router.replace(ROUTES.STAFF)
//   }
// }
