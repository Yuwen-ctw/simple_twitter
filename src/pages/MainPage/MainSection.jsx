import { useEffect, useState } from 'react'
import { SectionTitle, Spinner } from 'components/share'
import { MainTweet } from 'components/Tweets'
import styles from 'assets/styles/pages/mainSection.module.scss'
import { getAllTweets } from 'api/tweets'
import { useOutletContext } from 'react-router-dom'

function MainSection() {
  const { handleUserOrTweetClick } = useOutletContext()
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(false)

  // TODO get data
  useEffect(() => {
    setLoading(true)
    async function getData() {
      const { success, data, message } = await getAllTweets()
      if (success) {
        // cancle the spinner
        setLoading(false)
        // update data
        setTweets(data.tweets)
      } else {
        // handle error
        console.error(message)
      }
    }
    getData()
  }, [])

  function handleLikeClick(likeId) {
    setTweets((draft) =>
      draft.map((tweet) => {
        if (tweet.id === likeId) return { ...tweet, isLiked: !tweet.isLiked }
        return tweet
      })
    )
  }

  // map data
  const tweetList = tweets.map((tweet) => {
    return (
      <MainTweet
        key={tweet.id}
        tweet={tweet}
        onLikeClick={handleLikeClick}
        onReplyClick={() => ''}
      />
    )
  })

  return (
    <section className={styles.sectionWrapper} onClick={handleUserOrTweetClick}>
      <SectionTitle text="首頁" />
      <h1 style={{ color: 'red' }}>這裡放TweetInput</h1>
      <hr />
      {loading && <Spinner />}
      <ul className="scrollbar">{tweetList}</ul>
    </section>
  )
}

export default MainSection
