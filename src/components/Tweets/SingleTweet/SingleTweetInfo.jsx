function SingleTweetInfo({ replyCount, likeCount, className }) {
  return (
    <div className={className}>
      <span>
        <strong>{`${replyCount} `}</strong>
        回覆
      </span>
      <span>
        <strong>{`${likeCount} `} </strong>
        喜歡次數
      </span>
    </div>
  )
}

export default SingleTweetInfo
