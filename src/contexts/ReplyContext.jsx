import { addReply } from 'api/tweets'
import { useState, createContext, useContext, useRef } from 'react'
import Toast from 'components/UI/Toast'

const defaultContextValue = {
  replyInputValue: null,
  replyInputRef: null,
  disabled: null,
  showReplyModal: null,
  handleOpenModal: null,
  handleCloseModal: null,
  handleReplyInputChange: null,
  handleAddReply: null,
  isReplyCreated: null,
}
const ReplyContext = createContext(defaultContextValue)

export const useReply = () => useContext(ReplyContext)

export function ReplyContextProvider({ children }) {
  const [replyInputValue, setReplyInputValue] = useState('')
  const [showReplyModal, setReplyModal] = useState({ isShow: false, tweet: {} })
  const [isReplyCreated, setIsReplyCreated] = useState(false)
  const replyInputRef = useRef(null)
  const [disabled, setDisabled] = useState(false)

  function handleReplyInputChange(value) {
    value.length > 1 &&
      replyInputRef.current?.setAttribute('data-zeroSize', 'false')
    setReplyInputValue(value)
  }

  async function handleAddReply(tweetId) {
    if (replyInputValue.length === 0) {
      replyInputRef.current?.setAttribute('data-zeroSize', 'true')
      return
    }
    setDisabled(true)
    const { success, message } = await addReply({
      tweetId,
      comment: replyInputValue,
    })
    if (success) {
      Toast('回覆發送成功', 'success').fire()
      setIsReplyCreated(true)
      handleCloseModal()
    } else {
      Toast(`回覆失敗: ${message}`, 'error').fire()
      console.error(message)
    }
    setDisabled(false)
  }

  function handleOpenModal(tweet) {
    // clean the error message
    replyInputRef.current?.setAttribute('data-zeroSize', 'false')
    setReplyModal({ isShow: true, tweet })
  }

  function handleCloseModal() {
    if (isReplyCreated) setIsReplyCreated(false)
    setReplyInputValue('')
    setReplyModal({ isShow: false, tweet: {} })
  }
  return (
    <ReplyContext.Provider
      value={{
        replyInputValue,
        replyInputRef,
        disabled,
        showReplyModal,
        handleOpenModal,
        handleCloseModal,
        handleReplyInputChange,
        handleAddReply,
        isReplyCreated,
      }}
    >
      {children}
    </ReplyContext.Provider>
  )
}
