// 标准输入输出 
// process.stdin.pipe(process.stdout)


// 网络 I/O
// const http = require('http')

// const server = http.createServer((req, res) => {
// 	if(req.method === 'POST'){
// 		req.pipe(res) // 最主要
// 	}
// })

// server.listen(9000)

// 文件 I/O
// 复制文件
// const fs = require('fs')
// const path = require('path')

// // 两个文件名
// const fileName1 = path.resolve(__dirname, 'data.txt')
// const fileName2 = path.resolve(__dirname, 'data-bak.txt')

// // 读取文件的 stream 对象
// const readStream = fs.createReadStream(fileName1)
// // 写入文件的 stream 对象
// const writeStream = fs.createWriteStream(fileName2)
// // 执行拷贝, 通过 pipe
// readStream.pipe(writeStream)

// readStream.on('data', chunk => {
// 	console.log(chunk.toString())
// })

// readStream.on('end', _ => {
// 	console.log('拷贝完成')
// })


// 
const http = require('http')
const fs = require('fs')
const path = require('path')

const fileName1 = path.resolve(__dirname, 'data.txt')

const server = http.createServer((req, res) => {
	if(req.method === 'GET'){
		const readStream = fs.createReadStream(fileName1)
		readStream.pipe(res)
	}
})

server.listen(9000)