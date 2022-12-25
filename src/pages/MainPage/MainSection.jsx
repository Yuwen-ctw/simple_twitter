import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import { useNewTweet } from 'contexts/NewTweetContext'
import { useReply } from 'contexts/ReplyContext'
import useFetch from 'customHooks/useFetch'
import useRWD from 'customHooks/useRWD'
import { getAllTweets } from 'api/tweets'
import { SectionTitle, Spinner, UserAvatar } from 'components/share'
import { TweetInput } from 'components/form'
import { MainTweet } from 'components/Tweets'
import styles from 'assets/styles/pages/mainSection.module.scss'

function MainSection() {
  const { isOnMobile } = useRWD()
  const { handleUserOrTweetClick } = useOutletContext()
  const { currentUser } = useAuth()
  const {
    tweetInput,
    disabled,
    handleInputChange,
    handleAddTweet,
    handleToggleLikeTweet,
    isTweetCreated,
    errMsg,
  } = useNewTweet()
  const { handleOpenModal, isReplyCreated } = useReply()
  const [tweets, setTweets] = useState([])
  const { data, loading, refetch } = useFetch(getAllTweets)

  useEffect(() => {
    if (!data) return
    setTweets(data)
  }, [loading])

  // effect when add new tweet or reply
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
      <SectionTitle text="首頁">
        {isOnMobile && <UserAvatar src={currentUser?.avatar} />}
      </SectionTitle>
      <TweetInput
        src={currentUser?.avatar}
        value={tweetInput}
        onChange={handleInputChange}
        onClick={handleAddTweet}
        disabled={disabled}
        errMsg={errMsg}
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
