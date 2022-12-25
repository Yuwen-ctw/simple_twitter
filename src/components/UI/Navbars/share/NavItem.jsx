import styles from 'assets/styles/components/ui/navbars.module.scss'
import { Link } from 'react-router-dom'
import useRWD from 'customHooks/useRWD'
const NavItem = ({ value, text, check, to, onClick }) => {
  const { isOnDesktop } = useRWD()
  return (
    <>
      <input
        type="checkbox"
        value={value}
        checked={check === value}
        data-value={value}
        readOnly
      />
      <Link
        className={styles.navItem}
        data-value={value}
        to={to}
        state={value}
        onClick={onClick}
      >
        {isOnDesktop ? text : ''}
      </Link>
    </>
  )
}

export default NavItem
