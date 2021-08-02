const path = require('path')
const fs = require('fs')
let totalSize = 0

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

function getTotalSize(entry) {
  const files = fs.readdirSync(entry)
  files.forEach(f => {
    const depFilePath = path.resolve(entry, f)
    const stat = fs.statSync(depFilePath)
    if (stat.isDirectory()) {
      getTotalSize(depFilePath)
    } else if (path.extname(depFilePath) === '.vue') {
      totalSize += 1
    }
  })
  
  return totalSize
}

module.exports = {
  emptyDir,
  mkdirSync,
  existsSync,
  rmSync,
  rmAndMkdirSync,
  getTotalSize
}