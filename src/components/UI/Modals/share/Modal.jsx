import styles from 'assets/styles/components/modals/modal.module.scss'

function Modal({ active, onClose, children, title }) {
  function handeEscape(e) {
    if (e.target.id === 'backdrop') onClose()
  }

  return (
    <>
      <div
        className={[styles.background, active && 'active'].join(' ')}
        onClick={handeEscape}
        onKeyDown={handeEscape}
        id="backdrop"
      >
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
