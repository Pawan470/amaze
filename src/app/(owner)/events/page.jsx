'use client'
import { withRoleProtection } from '@/Hoc/withRoleProtection'
import { SYSTEM_ROLES } from '@/constants'
import usePreviousRoute from '@/hooks/usePreviousRoute'

function Events() {
  return <div className="container">Events 1</div>
}

export default withRoleProtection(Events, [SYSTEM_ROLES.OWNER])
