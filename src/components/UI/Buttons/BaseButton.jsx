import styles from 'assets/styles/components/ui/buttons.module.scss'
const BaseButton = ({ text, onClick, className }) => (
  <button
    className={[styles.baseButton, className].join(' ')}
    onClick={onClick}
  >
    {text}
  </button>
)
export default BaseButton
