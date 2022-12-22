import { useAuth } from 'contexts/AuthContext'
import { useReply } from 'contexts/ReplyContext'
import Modal from './share/Modal'
import { ModalTweet } from 'components/Tweets'
import { TweetInput } from 'components/form'
import styles from 'assets/styles/components/modals/replyModal.module.scss'

function ReplyModal() {
  const {
    replyInputValue,
    replyInputRef,
    disabled,
    handleReplyInputChange,
    handleAddReply,
    showReplyModal,
    handleCloseModal,
  } = useReply()
  const { isShow, tweet } = showReplyModal
  const { currentUser } = useAuth()
  return (
    <Modal active={isShow} onClose={handleCloseModal}>
      <ModalTweet tweet={tweet} />
      <div className={[styles.replyWrapper]}>
        <TweetInput
          ref={replyInputRef}
          src={currentUser?.avatar}
          value={replyInputValue}
          onChange={handleReplyInputChange}
          onClick={() => handleAddReply(tweet.id)}
          placeholder="推你的回覆"
          buttonText="回覆"
          disabled={disabled}
        />
      </div>
    </Modal>
  )
}
export default ReplyModal
