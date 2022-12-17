import Modal from './share/Modal'
import { TweetInput } from 'components/form'
import styles from 'assets/styles/components/modals/tweetModal.module.scss'
import { useMainTweets } from 'contexts/MainTweetsContext'
import { useAuth } from 'contexts/AuthContext'
function TweetModal({ active, onClose }) {
  const { tweetInput, handleInputChange, handleAddTweet, modalTweetInputRef } =
    useMainTweets()
  const { currentUser } = useAuth()

  async function handleClickAddTweet() {
    const { isCreated } = await handleAddTweet()
    console.log(isCreated)
    if (isCreated) onClose()
  }

  return (
    <Modal active={active} onClose={onClose}>
      <div className={styles.layout}>
        <TweetInput
          ref={modalTweetInputRef}
          src={currentUser?.avatar}
          value={tweetInput}
          onChange={handleInputChange}
          onClick={handleClickAddTweet}
        />
      </div>
    </Modal>
  )
}
export default TweetModal
