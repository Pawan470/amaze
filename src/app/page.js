'use client'

import { withRoleProtection } from '@/Hoc/withRoleProtection'
import styles from './page.module.scss'
import Loader from '@/components/shared/Loader'

function Home() {
  return (
    <div className={styles.main}>
      <h1>Home Page</h1>
      <button className={styles['my-button']}>click 2</button>
    </div>
  )
}

export default withRoleProtection(Home, [])
