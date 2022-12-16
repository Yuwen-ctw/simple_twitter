import Modal from './share/Modal'
import { TweetInput } from 'components/form'
import styles from 'assets/styles/components/modals/tweetModal.module.scss'
import { useMainTweets } from 'contexts/MainTweetsContext'
import { useAuth } from 'contexts/AuthContext'
function TweetModal({ active, onClose }) {
  const { inputValue, handleInputChange, handleAddTweet, modalTweetInputRef } =
    useMainTweets()
  const { currentUser } = useAuth()
  return (
    <Modal active={active} onClose={onClose}>
      <div className={styles.layout}>
        <TweetInput
          ref={modalTweetInputRef}
          src={currentUser?.avatar}
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleAddTweet}
        />
      </div>
    </Modal>
  )
}
export default TweetModal
