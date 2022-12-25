import { addReply } from 'api/tweets'
import { useState, createContext, useContext } from 'react'
import Toast from 'components/UI/Toast'

const defaultContextValue = {
  replyInputValue: null,
  errMsg: null,
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
  const [disabled, setDisabled] = useState(false)
  const [isReplyCreated, setIsReplyCreated] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState({
    isShow: false,
    tweet: {},
  })
  const [errMsg, setErrMsg] = useState('')

  function handleReplyInputChange(value) {
    value.length > 0 && setErrMsg('')
    setReplyInputValue(value)
  }

  async function handleAddReply(tweetId) {
    // 檢查字數
    if (replyInputValue.length === 0) {
      setErrMsg('內容不可空白')
      return
    }
    // start add reply process
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
    setShowReplyModal({ isShow: true, tweet })
  }

  function handleCloseModal() {
    if (isReplyCreated) setIsReplyCreated(false)
    setErrMsg('')
    setReplyInputValue('')
    setShowReplyModal({ isShow: false, tweet: {} })
  }

  return (
    <ReplyContext.Provider
      value={{
        replyInputValue,
        errMsg,
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
