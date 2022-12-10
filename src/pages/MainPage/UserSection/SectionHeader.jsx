import { backImage } from 'assets/images/index'
import styles from 'assets/styles/pages/userSection.module.scss'
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index'

function SectionHeader({ user }) {
  const navigate = useNavigate()

  function handleClick() {
    // TODO: 應該導去何處
    navigate(-1)
  }

  return (
    <div className={styles.sectionHeader} onClick={handleClick}>
      <img src={backImage} alt="A left direction arrow" />
      <div>
        <p>{user?.name}</p>
        <span>{user?.tweetAmount} 推文</span>
      </div>
    </div>
  )
}

export default SectionHeader
