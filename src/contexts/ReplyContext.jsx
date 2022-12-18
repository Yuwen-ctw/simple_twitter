import { addReply } from 'api/tweets'
import { useState, createContext, useContext, useRef } from 'react'

const defaultContextValue = {
  replyInputValue: null,
  replyInputRef: null,
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
    const { success, message } = await addReply({
      tweetId,
      comment: replyInputValue,
    })
    if (success) {
      setIsReplyCreated(true)
      handleCloseModal()
    } else {
      console.error(message)
    }
  }

  function handleOpenModal(tweet) {
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
