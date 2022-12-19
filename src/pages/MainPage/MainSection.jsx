import { SectionTitle, Spinner } from 'components/share'
import { MainTweet } from 'components/Tweets'
import styles from 'assets/styles/pages/mainSection.module.scss'
import { useOutletContext } from 'react-router-dom'
import { TweetInput } from 'components/form'
import { useAuth } from 'contexts/AuthContext'
import { useNewTweet } from 'contexts/NewTweetContext'
import { useReply } from 'contexts/ReplyContext'
import { useEffect, useState } from 'react'
import { getAllTweets } from 'api/tweets'

function MainSection() {
  const { handleUserOrTweetClick, showTweetModal } = useOutletContext()
  const { currentUser } = useAuth()
  const {
    tweetInput,
    handleInputChange,
    handleAddTweet,
    mainTweetInputRef,
    handleToggleLikeTweet,
  } = useNewTweet()
  const { handleOpenModal, isReplyCreated } = useReply()
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // return if no newTweet add
    if (showTweetModal) return
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
    // refresh when add new tweet or reply
  }, [isReplyCreated, showTweetModal])

  async function handleAddTweetClick() {
    const { success, tweet } = await handleAddTweet()
    if (success) {
      setLoading(true)
      setTimeout(() => {
        setTweets([tweet, ...tweets])
        setLoading(false)
      }, 1000)
    }
  }

  async function handleLikeClick(tweetId, isLiked) {
    const { success, message } = await handleToggleLikeTweet(tweetId, isLiked)
    if (success) {
      setTweets((draft) =>
        draft.map((tweet) => {
          if (tweet.id === tweetId)
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
  // map data
  const tweetList = tweets.map((tweet) => {
    return (
      <MainTweet
        key={tweet.id}
        tweet={tweet}
        onLikeClick={handleLikeClick}
        onReplyClick={handleOpenModal}
      />
    )
  })

  return (
    <section className={styles.sectionWrapper}>
      <SectionTitle text="首頁" />
      <TweetInput
        ref={mainTweetInputRef}
        src={currentUser?.avatar}
        value={tweetInput}
        onChange={handleInputChange}
        onClick={handleAddTweetClick}
      />
      <hr />
      {loading && <Spinner />}
      <ul className="scrollbar" onClick={handleUserOrTweetClick}>
        {tweetList}
      </ul>
    </section>
  )
}

export default MainSection
