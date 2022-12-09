import styles from 'assets/styles/components/ui/navbars.module.scss'
import { Link } from 'react-router-dom'
const NavItem = ({ value, text, check, to }) => {
  return (
    <>
      <input
        type="checkbox"
        value={value}
        checked={check === value}
        data-value={value}
        readOnly
      />
      <Link className={styles.navItem} data-value={value} to={to}>
        {text}
      </Link>
    </>
  )
}

export default NavItem
