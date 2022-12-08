import styles from 'assets/styles/components/share/logo.module.scss'
import { logoImage } from 'assets/images'
const Logo = () => (
  <div className={styles.logo}>
    <img
      src={logoImage}
      alt="A white color alpha sign with orange background."
    />
  </div>
)

export default Logo
