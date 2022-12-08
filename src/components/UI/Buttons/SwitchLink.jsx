import { Link } from 'react-router-dom'
import styles from 'assets/styles/components/ui/links.module.scss'
function SwitchLink({ text, to, active }) {
  const className = active ? styles.switchLink__active : styles.switchLink
  return (
    <Link to={to} className={className}>
      {text}
    </Link>
  )
}
export default SwitchLink
