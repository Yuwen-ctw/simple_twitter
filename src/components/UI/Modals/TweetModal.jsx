import Modal from './share/Modal'
import { TweetInput } from 'components/form'
import styles from 'assets/styles/components/modals/tweetModal.module.scss'
import { useMainTweets } from 'contexts/MainTweetsContext'
import { useAuth } from 'contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
function TweetModal({ active, onClose }) {
  const { tweetInput, handleInputChange, handleAddTweet, modalTweetInputRef } =
    useMainTweets()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  async function handleClickAddTweet() {
    const { isCreated } = await handleAddTweet()
    if (isCreated) onClose()
    navigate('/')
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
