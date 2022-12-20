import { useEffect, useState } from 'react'
import { getAllTweets, deleteTweet } from 'api/admin'
import { SectionTitle, Spinner } from 'components/share'
import { AdminTweet } from 'components/Tweets'
import styles from 'assets/styles/pages/adminMainSection.module.scss'

function AdminTweetSection() {
  const [loading, setLoading] = useState(false)
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    // show spinner
    setLoading(true)
    // get data
    async function getAllTweetsByAdminAsync() {
      const { success, data, message } = await getAllTweets()
      if (success) {
        setLoading(false)
        setTweets(data)
      } else {
        console.error(message)
      }
    }
    getAllTweetsByAdminAsync()
  }, [])

  async function handleDeleteTweet(tweetId) {
    const { success, message } = await deleteTweet(tweetId)
    if (success) {
      setTweets((draft) => draft.filter((tweet) => tweet.id !== tweetId))
    } else {
      console.error(message)
    }
    return { completed: true }
  }

  // map data
  const tweetList = tweets.map((tweet) => (
    <AdminTweet key={tweet.id} tweet={tweet} onDelete={handleDeleteTweet} />
  ))

  return (
    <section className={[styles.tweetLayout, 'scrollbar'].join(' ')}>
      <SectionTitle text="推文清單" />
      {loading && <Spinner />}
      <ul>{tweetList}</ul>
    </section>
  )
}

export default AdminTweetSection
