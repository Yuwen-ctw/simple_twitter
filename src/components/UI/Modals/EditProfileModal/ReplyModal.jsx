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

  return (
    <Modal active={showReplyModal.isShow} onClose={handleCloseModal}>
      <ModalTweet tweet={showReplyModal.tweet} />
      <div className={[styles.replyWrapper]}>
        <TweetInput
          ref={replyInputRef}
          src={showReplyModal.tweet?.User?.avatar}
          value={replyInputValue}
          onChange={handleReplyInputChange}
          onClick={handleAddReply}
          placeholder={'推你的回覆'}
        />
      </div>
    </Modal>
  )
}
export default ReplyModal
