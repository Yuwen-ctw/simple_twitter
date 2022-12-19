function shortenDescription(description) {
  if (!description) {
    console.error(`無法處理的description: ${description}`)
    return ''
  }
  if (typeof description !== 'string') {
    console.error(
      `invalid type: description: ${description}, type: ${typeof description} `
    )
    return ''
  }
  if (description.length <= 50) return description
  return description.slice(0, 50).trim().concat('...')
}
export default shortenDescription
