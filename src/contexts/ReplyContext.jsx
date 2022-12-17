import { useState, createContext, useContext, useRef } from 'react'

const defaultContextValue = {
  replyInputValue: null,
  replyInputRef: null,
  handleReplyInputChange: null,
  handleClickAddReply: null,
}
const ReplyContext = createContext(defaultContextValue)

export const useReply = () => useContext(ReplyContext)

export function ReplyContextProvider({ children }) {
  const [replyInputValue, setReplyInputValue] = useState('')
  const [showReplyModal, setReplyModal] = useState({ isShow: false, tweet: {} })
  const replyInputRef = useRef(null)

  function handleReplyInputChange(value) {
    value.length > 1 &&
      replyInputRef.current?.setAttribute('data-zeroSize', 'false')
    setReplyInputValue(value)
  }

  function handleAddReply() {
    if (replyInputValue.length === 0) {
      replyInputRef.current?.setAttribute('data-zeroSize', 'true')
      return
    }
  }

  function handleOpenModal(tweet) {
    setReplyModal({ isShow: true, tweet })
  }

  function handleCloseModal() {
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
      }}
    >
      {children}
    </ReplyContext.Provider>
  )
}
