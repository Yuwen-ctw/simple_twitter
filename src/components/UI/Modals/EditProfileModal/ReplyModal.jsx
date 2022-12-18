import Modal from '../share/Modal'
import { ModalTweet } from 'components/Tweets'
import { TweetInput } from 'components/form'
import styles from 'assets/styles/components/modals/replyModal.module.scss'
import { useReply } from 'contexts/ReplyContext'

function ReplyModal() {
  const {
    replyInputValue,
    replyInputRef,
    handleReplyInputChange,
    handleAddReply,
    showReplyModal,
    handleCloseModal,
  } = useReply()
  const { isShow, tweet } = showReplyModal
  return (
    <Modal active={isShow} onClose={handleCloseModal}>
      <ModalTweet tweet={tweet} />
      <div className={[styles.replyWrapper]}>
        <TweetInput
          ref={replyInputRef}
          src={tweet?.User?.avatar}
          value={replyInputValue}
          onChange={handleReplyInputChange}
          onClick={() => handleAddReply(tweet.id)}
          placeholder={'推你的回覆'}
        />
      </div>
    </Modal>
  )
}
export default ReplyModal
