const fs = require('fs')
const path = require('path')

/**
 * @description 写日志
 * @param {*} writeStream 
 * @param {*} log 
 */
function writeLog(writeStream, log) {
	writeStream.write(log + '\n') // 关键代码
} 

/**
 * @description 生成 write stream
 * @param {string} filename 文件名 
 */
function createWriteStream(filename) {
	const fullFileName = path.join(__dirname, '../', '../', 'logs', filename)
	const writeStream = fs.createWriteStream(fullFileName, {
		flag: 'a'
	})

	return writeStream
}

const accessWriteStream = createWriteStream('access.log')

/**
 * @description 写访问日志
 * @param {*} log 
 */
function access(log) {
	writeLog(accessWriteStream, log)
}

module.exports = {
	access
}