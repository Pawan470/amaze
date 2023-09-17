'use client'

import { withRoleProtection } from '@/Hoc/withRoleProtection'
import { SYSTEM_ROLES } from '@/constants'
import React from 'react'

function Page() {
  return <div>offices</div>
}

export default withRoleProtection(Page, [SYSTEM_ROLES.OWNER])
