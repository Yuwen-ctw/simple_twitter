import { Logo } from 'components/share'
import styles from 'assets/styles/components/ui/navbars.module.scss'
import useRWD from 'customHooks/useRWD'

const Navbar = ({ children }) => {
  const { isOnMobile } = useRWD()
  return (
    <aside className={styles.navbar}>
      {isOnMobile ? '' : <Logo />}
      {children}
    </aside>
  )
}

export default Navbar
