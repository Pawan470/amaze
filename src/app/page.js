'use client'

import { withRoleProtection } from '@/Hoc/withRoleProtection'
import styles from './page.module.scss'

function Home() {
  return (
    <main className={styles.main}>
      <button className={styles['my-button']}>click 2</button>
    </main>
  )
}

export default withRoleProtection(Home, [])
