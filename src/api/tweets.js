import axios from 'axios'
const baseUrl = 'http://localhost:3001'

export async function getAllTweets() {
  try {
    const res = await axios.get(`${baseUrl}/tweets`)
    return res.data
  } catch (err) {
    console.log('[Get tweets failed]: ', err)
  }
}

export async function getTweet(tweetId) {
  try {
    const res = await axios.get(`${baseUrl}/tweet${tweetId}`)
    return res.data
  } catch (err) {
    console.log('[Get tweet failed]: ', err)
  }
}
