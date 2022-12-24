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
import Toast from 'components/UI/Toast'
import useFetch from 'api/useFetch'

function MainSection() {
  const { handleUserOrTweetClick } = useOutletContext()
  const { currentUser } = useAuth()
  const {
    tweetInput,
    disabled,
    handleInputChange,
    handleAddTweet,
    mainTweetInputRef,
    handleToggleLikeTweet,
    isTweetCreated,
  } = useNewTweet()
  const { handleOpenModal, isReplyCreated } = useReply()
  const [tweets, setTweets] = useState([])
  const { data, loading, error, refetch } = useFetch(getAllTweets)

  if (error) Toast(error, 'error').fire()

  useEffect(() => {
    if (!data) return
    setTweets(data)
  }, [loading])

  useEffect(() => {
    if (!isReplyCreated && !isTweetCreated) return
    refetch(getAllTweets)
  }, [isReplyCreated, isTweetCreated])

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
        onClick={handleAddTweet}
        disabled={disabled}
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
