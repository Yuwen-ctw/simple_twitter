import { useEffect, useState } from 'react'
import { getAllTweets, deleteTweet } from 'api/admin'
import { SectionTitle, Spinner } from 'components/share'
import { AdminTweet } from 'components/Tweets'
import Toast from 'components/UI/Toast'
import styles from 'assets/styles/pages/adminMainSection.module.scss'
import useFetch from 'customHooks/useFetch'

function AdminTweetSection() {
  const [tweets, setTweets] = useState([])
  const { data, loading, error } = useFetch(getAllTweets)
  const [deleteState, setDeleteState] = useState({})

  useEffect(() => {
    if (!data) return
    setTweets(data)
  }, [loading])

  async function handleDeleteTweet(tweetId) {
    setDeleteState({ id: tweetId, deleting: true })

    const { success, message } = await deleteTweet(tweetId)
    if (success) {
      setTweets((draft) => draft.filter((tweet) => tweet.id !== tweetId))
    } else {
      console.error(message)
      Toast(error, 'error').fire()
    }

    setDeleteState({ id: tweetId, deleting: false })
    return
  }

  // map data
  const tweetList = tweets.map((tweet) => (
    <AdminTweet
      key={tweet.id}
      tweet={tweet}
      onDelete={handleDeleteTweet}
      deleteState={deleteState}
    />
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
