const fs = require('fs')

function emptyDir(filePath) {
  const files = fs.readdirSync(filePath)//读取该文件夹
  files.forEach((file) => {
    const nextFilePath = `${filePath}/${file}`
    const states = fs.statSync(nextFilePath)
    if (states.isDirectory()) {
      emptyDir(nextFilePath)
    } else {
      fs.unlinkSync(nextFilePath)
    }
  })
}

module.exports = {
  emptyDir
}