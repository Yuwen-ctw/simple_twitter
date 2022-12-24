import { useAuth } from 'contexts/AuthContext'
import { useNewTweet } from 'contexts/NewTweetContext'
import Modal from './share/Modal'
import { TweetInput } from 'components/form'
import styles from 'assets/styles/components/modals/tweetModal.module.scss'

function TweetModal({ active, onClose }) {
  const {
    tweetInput,
    disabled,
    handleInputChange,
    handleAddTweet,
    modalTweetInputRef,
  } = useNewTweet()
  const { currentUser } = useAuth()

  async function handleClickAddTweet() {
    const success = await handleAddTweet()
    if (success) onClose()
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
