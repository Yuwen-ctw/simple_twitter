import { SectionTitle, Spinner } from 'components/share'
import { MainTweet } from 'components/Tweets'
import styles from 'assets/styles/pages/mainSection.module.scss'
import { useOutletContext } from 'react-router-dom'
import { TweetInput } from 'components/form'
import { useAuth } from 'contexts/AuthContext'
import { useMainTweets } from 'contexts/MainTweetsContext'

function MainSection() {
  const { handleUserOrTweetClick } = useOutletContext()
  const { currentUser } = useAuth()
  const {
    tweetInput,
    handleInputChange,
    handleAddTweet,
    mainTweetInputRef,
    loading,
    tweets,
    handleLikeClick,
  } = useMainTweets()
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
    <section className={styles.sectionWrapper}>
      <SectionTitle text="首頁" />
      <TweetInput
        ref={mainTweetInputRef}
        src={currentUser?.avatar}
        value={tweetInput}
        onChange={handleInputChange}
        onClick={handleAddTweet}
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
