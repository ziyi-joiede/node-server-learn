const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件内容
// fs.readFile(fileName, (err, data) => {
// 	if(err) {
// 		console.log(err)
// 		return
// 	}
// 	// data 是二进制类型,需要转成字符串
// 	console.log(data.toString())
// })

// 写入文件
// const content = '这是新写入的内容\n'
// const opt = {
// 	flag: 'a', // 追加写入文件. 覆盖用 'w'
// }
// fs.writeFile(fileName, content, opt, err => {
// 	if(err) {
// 		console.log(err)
// 	}
// })

// 以上操作存在的问题:读取或写入的文件如果过大会有问题

// 判断文件是否存在
fs.exists(fileName, exist => {
	console.log('exist ', exist)
})