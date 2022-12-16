import { useState, createContext, useContext, useRef, useEffect } from 'react'
import { addTweet, getAllTweets, likeTweet, dislikeTweet } from 'api/tweets'
import { useAuth } from './AuthContext'
const defaultContextValue = {
  loading: null,
  tweets: null,
  tweetInput: null,
  handleInputChange: null,
  handleAddTweet: null,
  handleLikeClick: null,
  mainTweetInputRef: null,
  modalTweetInputRef: null,
}
const MainTweetsContext = createContext(defaultContextValue)
export const useMainTweets = () => useContext(MainTweetsContext)

export function MainTweetsContextProvider({ children }) {
  const [tweetInput, setTweetInput] = useState('')
  const mainTweetInputRef = useRef(null)
  const modalTweetInputRef = useRef(null)
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()

  useEffect(() => {
    setLoading(true)
    async function getData() {
      const { success, data, message } = await getAllTweets()
      if (success) {
        // cancle the spinner
        setLoading(false)
        // update data
        setTweets(data)
      } else {
        // handle error
        console.error(message)
      }
    }
    getData()
  }, [])

  function handleInputChange(value) {
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
      return
    }
    setLoading(true)
    const { success, tweet, message } = await addTweet(tweetInput)
    if (success) {
      // update data
      tweet.User = currentUser
      setLoading(false)
      setTweets([tweet, ...tweets])
    } else {
      // handle error
      setLoading(false)
      console.error(message)
    }
  }
  async function handleLikeClick(likeId, isLiked) {
    // send api
    const { success, message } = isLiked
      ? await dislikeTweet(likeId)
      : await likeTweet(likeId)
    // update tweets if success
    if (success) {
      setTweets((draft) =>
        draft.map((tweet) => {
          if (tweet.id === likeId)
            return {
              ...tweet,
              isLiked: !tweet.isLiked,
              likeCount: isLiked ? tweet.likeCount - 1 : tweet.likeCount + 1,
            }
          return tweet
        })
      )
      // handle failed
    } else {
      console.error(message)
    }
  }

  return (
    <MainTweetsContext.Provider
      value={{
        loading,
        tweets,
        tweetInput,
        handleInputChange,
        handleAddTweet,
        handleLikeClick,
        mainTweetInputRef,
        modalTweetInputRef,
      }}
    >
      {children}
    </MainTweetsContext.Provider>
  )
}
