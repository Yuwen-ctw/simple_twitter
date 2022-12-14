function formatCreateTime(dateString) {
  if (!dateString) return

  const createTime = new Date(dateString)
  if (isNaN(createTime)) {
    console.log(`無法處理的時間格式: ${dateString}`)
    return dateString
  }

  const year = createTime.getFullYear()
  const month = createTime.getMonth() + 1
  const day = createTime.getDate()
  let hour = createTime.getHours()
  let min = createTime.getMinutes()
  hour = hour > 12 ? `下午 ${hour - 12}` : `上午 ${hour}`
  min = min.toString().padStart(2, '0')
  return `${hour}:${min} · ${year}年${month}月${day}日`
}
export default formatCreateTime
