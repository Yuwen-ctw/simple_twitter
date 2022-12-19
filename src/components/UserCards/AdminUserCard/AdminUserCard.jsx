import { AdminCardAvatar, UserTweetInfo, AdminCardBackground } from './base'
import { SubText, UserFollowInfo, UserNameText } from 'components/share'
import styles from 'assets/styles/components/userCards/adminUserCard.module.scss'
import { defaultCover } from 'assets/images'
import convertAmount from 'uitlities/convertAmount'

function AdminUserCard({ user }) {
  return (
    <li className={styles.layout}>
      <AdminCardBackground className={styles.cover} src={defaultCover} />
      <AdminCardAvatar className={styles.adminCardAvatar} src={user?.avatar} />
      <UserNameText name={user?.name} />
      <SubText text={`@${user?.account}`} />
      <UserTweetInfo
        tweetCount={convertAmount(user?.tweetCount)}
        likeCount={convertAmount(user?.likeCount)}
        className={styles.tweetInfo}
      />
      <UserFollowInfo
        followerCount={user?.followerCount}
        followingCount={user?.followingCount}
      />
    </li>
  )
}

export default AdminUserCard
