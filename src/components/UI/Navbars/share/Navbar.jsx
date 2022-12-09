import { Logo } from 'components/share'
import styles from 'assets/styles/components/ui/navbars.module.scss'
const Navbar = ({ children }) => {
  return (
    <aside className={styles.navbar}>
      <Logo />
      {children}
    </aside>
  )
}

export default Navbar
