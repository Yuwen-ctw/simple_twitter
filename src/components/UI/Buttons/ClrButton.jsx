import styles from 'assets/styles/components/ui/buttons.module.scss'
const ClrButton = ({ text, onClick, className }) => (
  <button className={[styles.clrButton, className].join(' ')} onClick={onClick}>
    {text}
  </button>
)
export default ClrButton
