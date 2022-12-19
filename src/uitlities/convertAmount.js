function convertAmount(count) {
  if (typeof count !== 'number') {
    console.error(`格式轉換異常: 非預期的數字格式 ${typeof count} (${count})`)
  }
  const billion = count / (1000 * 1000 * 1000)
  if (billion > 1) return `${Math.floor(billion * 10) / 10}b`
  const million = billion * 1000
  if (million > 1) return `${Math.floor(million * 10) / 10}m`
  const thousand = million * 1000
  if (thousand > 1) return `${Math.floor(thousand * 10) / 10}k`
  return count
}

export default convertAmount
