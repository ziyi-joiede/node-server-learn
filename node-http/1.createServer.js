const http = require('http')  // commonjs
// require 三个层级 1. 系统自带的模块; 2. npm 安装的; 3. 自定义

// req:Request, res:Response
const server  = http.createServer((req, res) => {

	const url = req.url

	console.log('url is %s', url)

	// console.log('已经收到 http 请求')
	res.end('hello world') // res 返回信息给前端
})

server.listen(3000,() => {}) // 监听 http 请求
console.log('http 请求已经被监听, 3000 端口, 请访问 http://localhost:3000')