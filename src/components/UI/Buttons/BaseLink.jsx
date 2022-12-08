import { Link } from 'react-router-dom'
import styles from 'assets/styles/components/ui/links.module.scss'
function BaseLink({ text, to }) {
  return (
    <>
      <Link to={to} className={styles.baseLink}>
        {text}
      </Link>
    </>
  )
}
export default BaseLink
