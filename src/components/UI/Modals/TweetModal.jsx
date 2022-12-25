import { useAuth } from 'contexts/AuthContext'
import { useNewTweet } from 'contexts/NewTweetContext'
import Modal from './share/Modal'
import { TweetInput } from 'components/form'
import styles from 'assets/styles/components/modals/tweetModal.module.scss'

function TweetModal({ active, onClose }) {
  const { tweetInput, disabled, errMsg, handleInputChange, handleAddTweet } =
    useNewTweet()
  const { currentUser } = useAuth()

  async function handleClickAddTweet() {
    const { success } = await handleAddTweet()
    if (success) onClose()
  }

  return (
    <Modal active={active} onClose={onClose}>
      <div className={styles.layout}>
        <TweetInput
          src={currentUser?.avatar}
          value={tweetInput}
          onChange={handleInputChange}
          onClick={handleClickAddTweet}
          disabled={disabled}
          errMsg={errMsg}
        />
      </div>
    </Modal>
  )
}
export default TweetModal
