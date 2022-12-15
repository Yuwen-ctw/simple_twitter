import styles from 'assets/styles/components/share/userFollowInfo.module.scss'

const UserFollowInfo = ({ followingCount, followerCount, onClick }) => {
  return (
    <div className={styles.layout}>
      <div onClick={() => onClick('followings')}>
        <span className={styles.count}>{followingCount} 個</span>
        <span className={styles.state}>跟隨中</span>
      </div>
      <div onClick={() => onClick('followers')}>
        <span className={styles.count}>{followerCount} 位</span>
        <span className={styles.state}>跟隨者</span>
      </div>
    </div>
  )
}

export default UserFollowInfo
