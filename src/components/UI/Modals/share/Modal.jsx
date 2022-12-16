import styles from 'assets/styles/components/modals/modal.module.scss'

function Modal({ active, onClose, children, title }) {
  return (
    <>
      <div className={[styles.background, active && 'active'].join(' ')}>
        <div className={styles.dialog}>
          <div className={styles.dialog__header}>
            <button className={styles.closeBtn} onClick={onClose} />
            <p className={styles.title}>{title}</p>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
export default Modal
