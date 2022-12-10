import { NavLink } from 'react-router-dom'
import styles from 'assets/styles/components/ui/links.module.scss'
function SwitchLink({ text, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? styles.switchLink__active : styles.switchLink
      }
    >
      {text}
    </NavLink>
  )
}
export default SwitchLink
