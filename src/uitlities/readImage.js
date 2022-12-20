function readImage(file) {
  return new Promise((resolve, reject) => {
    // check file format via extension
    const isValid = file.name.match(/\.(png)|(jpg)|(jpeg)$/i)[0]
    if (!isValid) reject('檔案格式錯誤，請上傳 png、 jpg、 jpeg格式類型')

    // check file size
    const fileSize = Number((file.size / 1024 / 1024).toFixed(2))
    if (fileSize > 1) reject('你瘋了！檔案竟然超過1MB')

    const reader = new FileReader()
    // addEventListener to resolve the result
    reader.onload = (e) => resolve(e.target.result)
    // read data
    reader.readAsDataURL(file)
  })
}

export default readImage
