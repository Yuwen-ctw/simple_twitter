function SingleTweetInfo({ replyAmount, likeAmount, className }) {
  return (
    <div className={className}>
      <span>
        <strong>{`${replyAmount} `}</strong>
        回覆
      </span>
      <span>
        <strong>{`${likeAmount} `} </strong>
        喜歡次數
      </span>
    </div>
  )
}

export default SingleTweetInfo
