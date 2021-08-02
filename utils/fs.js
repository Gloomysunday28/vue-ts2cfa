const path = require('path')
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

function mkdirSync(filePath) {
  fs.mkdirSync(filePath)
}

function existsSync(filePath) {
  fs.existsSync(filePath)
}

function rmSync(filePath) {
  fs.rmSync(filePath)
}

function rmAndMkdirSync(dirname, output) {
  if (fs.existsSync(dirname)) {
    if (fs.existsSync(output)) {
      fs.rmSync(output)
    }
    return true;
  } else {
    if (rmAndMkdirSync(path.dirname(dirname), output)) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}
module.exports = {
  emptyDir,
  mkdirSync,
  existsSync,
  rmSync,
  rmAndMkdirSync,
}