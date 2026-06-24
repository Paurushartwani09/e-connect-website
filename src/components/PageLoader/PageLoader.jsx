import React from 'react'
import styles from './PageLoader.module.css'

export default function PageLoader() {
  return (
    <div className={styles.loader}>
      <div className={styles.ring}>
        <div /><div /><div /><div />
      </div>
      <span className={styles.text}>Loading…</span>
    </div>
  )
}
