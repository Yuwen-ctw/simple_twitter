function formatRelativeTime(dateString) {
  if (!dateString) return
  const past = new Date(dateString).getTime()
  const now = new Date().getTime()
  const relative = now - past
  // return ,if invalid
  if (isNaN(past)) {
    console.log(`無法處理的時間格式: ${dateString}`)
    return dateString
  }
  // return without handle if confused
  if (relative < 0) {
    console.log(`時間超出範圍，這是一個來自未來的時間: ${dateString}`)
    return dateString
  }

  const years = relative / (1000 * 3600 * 24 * 30 * 12)
  if (years > 1) return `${Math.floor(years)} 年前`
  const months = years * 12
  if (months > 1) return `${Math.floor(months)} 月前`
  const days = months * 30
  if (days > 1) return `${Math.floor(days)} 天前`
  const hours = days * 24
  if (hours > 1) return `${Math.floor(hours)} 小時前`
  const mins = hours * 60
  if (mins > 1) return `${Math.floor(mins)} 分鐘前`
  if (mins < 1) return '幾秒鐘前'

  console.log('發生未預期的錯誤')
  return dateString
}
export default formatRelativeTime
