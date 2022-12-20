import Modal from './share/Modal'
import { TweetInput } from 'components/form'
import styles from 'assets/styles/components/modals/tweetModal.module.scss'
import { useNewTweet } from 'contexts/NewTweetContext'
import { useAuth } from 'contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
function TweetModal({ active, onClose }) {
  const {
    tweetInput,
    disabled,
    handleInputChange,
    handleAddTweet,
    modalTweetInputRef,
  } = useNewTweet()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  async function handleClickAddTweet() {
    const { isTweetCreated } = await handleAddTweet()
    if (isTweetCreated) onClose()
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
          disabled={disabled}
        />
      </div>
    </Modal>
  )
}
export default TweetModal
