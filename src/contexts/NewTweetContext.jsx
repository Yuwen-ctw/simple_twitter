import { useState, createContext, useContext, useRef } from 'react'
import { addTweet, likeTweet, dislikeTweet } from 'api/tweets'
import { useAuth } from './AuthContext'
const defaultContextValue = {
  tweetInput: null,
  mainTweetInputRef: null,
  modalTweetInputRef: null,
  handleInputChange: null,
  handleAddTweet: null,
  handleToggleLikeTweet: null,
  isTweetCreated: null,
}
const NewTweetContext = createContext(defaultContextValue)

export const useNewTweet = () => useContext(NewTweetContext)

export function NewTweetContextProvider({ children }) {
  const { currentUser } = useAuth()
  const [tweetInput, setTweetInput] = useState('')
  const [isTweetCreated, setIsTweetCreated] = useState(false)
  const mainTweetInputRef = useRef(null)
  const modalTweetInputRef = useRef(null)

  function handleInputChange(value) {
    if (isTweetCreated) setIsTweetCreated(false)
    // check length and show or hide warning
    if (value.length > 140) {
      mainTweetInputRef.current?.setAttribute('data-tooMany', 'true')
      modalTweetInputRef.current?.setAttribute('data-tooMany', 'true')
    } else {
      mainTweetInputRef.current?.setAttribute('data-tooMany', 'false')
      mainTweetInputRef.current?.setAttribute('data-zeroSize', 'false')
      modalTweetInputRef.current?.setAttribute('data-tooMany', 'false')
      modalTweetInputRef.current?.setAttribute('data-zeroSize', 'false')
    }
    setTweetInput(value)
  }

  async function handleAddTweet() {
    // check length and show warning
    if (tweetInput.trim().length === 0) {
      mainTweetInputRef.current?.setAttribute('data-zeroSize', 'true')
      modalTweetInputRef.current?.setAttribute('data-zeroSize', 'true')
      return { isCreated: false }
    }
    if (tweetInput.trim().length > 140) return

    // send api
    const { success, tweet, message } = await addTweet(tweetInput)
    if (success) {
      // initial value
      tweet.User = currentUser
      tweet.likeCount = 0
      tweet.replyCount = 0
      // clean the tweet input
      setTweetInput('')
      return { success, tweet, message, isTweetCreated: true }
    } else {
      console.error(message)
      return { isCreated: false }
    }
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
        mainTweetInputRef,
        modalTweetInputRef,
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
