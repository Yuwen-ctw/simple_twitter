import { useState, createContext, useContext } from 'react'
import { addTweet, likeTweet, dislikeTweet } from 'api/tweets'
import Toast from 'components/UI/Toast'
const defaultContextValue = {
  tweetInput: null,
  disabled: null,
  errMsg: null,
  handleInputChange: null,
  handleAddTweet: null,
  handleToggleLikeTweet: null,
  isTweetCreated: null,
}
const NewTweetContext = createContext(defaultContextValue)

export const useNewTweet = () => useContext(NewTweetContext)

export function NewTweetContextProvider({ children }) {
  const [tweetInput, setTweetInput] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [isTweetCreated, setIsTweetCreated] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  function handleInputChange(value) {
    if (isTweetCreated) setIsTweetCreated(false)
    if (value.length > 140) {
      setErrMsg('字數不可超過 140 字')
    } else {
      setErrMsg('')
    }
    setTweetInput(value)
  }

  async function handleAddTweet() {
    if (isTweetCreated) setIsTweetCreated(false)

    if (tweetInput.trim().length === 0) {
      setErrMsg('內容不可空白')
      return { success: false }
    }

    if (tweetInput.trim().length > 140) return { success: false }

    // start add tweet process
    setDisabled(true)
    const { success, message } = await addTweet(tweetInput)
    if (success) {
      Toast('推文發送成功', 'success').fire()
      // clean the tweet input
      setTweetInput('')
      setDisabled(false)
      setIsTweetCreated(true)
    } else {
      console.error(message)
      Toast(`推文發送失敗: ${message}`, 'error').fire()
      setDisabled(false)
    }
    return { success }
  }

  async function handleToggleLikeTweet(tweetId, isLiked) {
    const { success, message } = isLiked
      ? await dislikeTweet(tweetId)
      : await likeTweet(tweetId)
    return { success, message }
  }

  return (
    <NewTweetContext.Provider
      value={{
        tweetInput,
        disabled,
        errMsg,
        handleInputChange,
        handleAddTweet,
        handleToggleLikeTweet,
        isTweetCreated,
      }}
    >
      {children}
    </NewTweetContext.Provider>
  )
}
