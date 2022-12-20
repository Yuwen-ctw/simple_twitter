import styles from 'assets/styles/components/share/spinner.module.scss'

function Spinner({ classname }) {
  return (
    <div className={[styles.wrapper, classname].join(' ')}>
      <span className={styles.loader}></span>
    </div>
  )
}

function SmallSpinner({ classname }) {
  return (
    <div className={[styles.smallWrapper, classname].join(' ')}>
      <span className={styles.smallLoader}></span>
    </div>
  )
}

export { Spinner, SmallSpinner }
