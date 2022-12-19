// hook, utilities
import { useState } from 'react'
import shortenDescription from 'uitlities/shortenDescription'
import formatRelativeTime from 'uitlities/formatRelativeTime'
// components, styles
import {
  ContentText,
  SubText,
  UserAvatar,
  UserNameText,
} from 'components/share'
import { Spinner } from 'components/share'
import styles from 'assets/styles/components/tweets/adminTweet.module.scss'

function AdminTweet({ tweet, onDelete }) {
  const [deleting, setDeleting] = useState(false)

  async function handleDeleteClick(tweetId) {
    setDeleting(true)
    const { completed } = await onDelete(tweetId)
    completed && setDeleting(false)
  }

  return (
    <li className={styles.layout} data-tweetid={tweet.id}>
      <UserAvatar src={tweet?.User?.avatar} />
      <UserNameText name={tweet?.User?.name} />
      <SubText
        text={`@${tweet?.User?.account}·${formatRelativeTime(
          tweet?.createdAt
        )}`}
      />
      <ContentText text={shortenDescription(tweet?.description)} />
      {deleting ? (
        <Spinner classname={styles.spinner} />
      ) : (
        <button
          className={styles.delBtn}
          onClick={() => handleDeleteClick(tweet.id)}
        />
      )}
    </li>
  )
}

export default AdminTweet
