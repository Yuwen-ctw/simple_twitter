import { useEffect, useState } from 'react'
import { SectionTitle } from 'components/share'
import { MainTweet } from 'components/Tweets'
import styles from 'assets/styles/pages/mainSection.module.scss'
import db from 'db.json'

function MainSection() {
  const [tweets, setTweets] = useState([])
  const [likeList, setLikeList] = useState([])
  // TODO get data
  useEffect(() => {
    setTweets(db.tweets)
    setLikeList(db.loginUser.like)
  }, [])

  function handleLikeClick(likeId, isLike) {
    const nextLikeList = [...likeList]
    // if not like yet
    if (!isLike) {
      return (
        // confirm if the likeId not included in like list, then push it
        !nextLikeList.includes(likeId) && setLikeList([...nextLikeList, likeId])
      )
    }
    // if liked, remove it
    // TODO send api
    setLikeList(nextLikeList.filter((id) => id !== likeId))
  }

  // map list
  const tweetList = tweets.map((tweet) => {
    likeList.includes(tweet.id) ? (tweet.isLike = true) : (tweet.isLike = false)
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
    <section className={styles.sectionWrapper}>
      <SectionTitle text="首頁" />
      <h1 style={{ color: 'red' }}>這裡放TweetInput</h1>
      <hr />
      <ul className="scrollbar">{tweetList}</ul>
    </section>
  )
}

export default MainSection
