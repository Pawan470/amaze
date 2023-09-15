'use client'
import { withRoleProtection } from '@/Hoc/withRoleProtection'
import { SYSTEM_ROLES } from '@/constants'
import React from 'react'

function Staff() {
  console.log('staff called')
  return <div>STAFF</div>
}

export default withRoleProtection(Staff, [SYSTEM_ROLES.STAFF])
