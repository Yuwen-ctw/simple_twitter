import { backImage } from 'assets/images/index'
import styles from 'assets/styles/pages/userSection.module.scss'
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index'

function SectionHeader({ user }) {
  const navigate = useNavigate()
  return (
    <div className={styles.sectionHeader} onClick={() => navigate(-1)}>
      <img src={backImage} alt="A left direction arrow" />
      <div>
        <p>{user?.name}</p>
        <span>{user?.tweetCount} 推文</span>
      </div>
    </div>
  )
}

export default SectionHeader
