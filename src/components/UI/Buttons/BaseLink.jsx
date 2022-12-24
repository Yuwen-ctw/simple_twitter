import { Link } from 'react-router-dom'
import styles from 'assets/styles/components/ui/links.module.scss'
function BaseLink({ text, to, className, onClick }) {
  return (
    <>
      <Link
        to={to}
        onClick={onClick}
        className={[styles.baseLink, className].join(' ')}
      >
        {text}
      </Link>
    </>
  )
}
export default BaseLink
