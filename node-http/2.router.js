const http = require('http')  // commonjs
// require 三个层级 1. 系统自带的模块; 2. npm 安装的; 3. 自定义

const querystring = require('querystring')

// req:Request, res:Response
const server  = http.createServer((req, res) => {

	const url = req.url
	const path = url.split('?')[0]
	const queryStr = url.split('?')[1]
	const method = req.method

	// console.log('url is ', url)
	// console.log('method is ', method)

	// 解析 querystring
	// const query = {}
	// queryStr && queryStr.split('&').forEach(item => {
	// 	// item 即 key=value
	// 	const key = item.split('=')[0]
	// 	const val = item.split('=')[1]

	// 	query[key] = val
	// })

	const query = querystring.parse(queryStr || '')

	// 定义路由: 模拟获取留言板列表
	if(path === '/api/list' && method === 'GET'){
		if(query.filterType === '1'){
			res.end('this is list router, all')
		}
		if(query.filterType === '2'){
			res.end('this is list router, only mine')
		}
		// res.end('this is list router')
	}

	// 路由定义: 模拟创建留言
	if(path === '/api/create' && method === 'POST'){
		res.end('this is create router')
	}

	// console.log('已经收到 http 请求')
	res.end('404') // res 返回信息给前端
})

server.listen(3000, () => {}) // 监听 http 请求
console.log('http 请求已经被监听, 3000 端口, 请访问 http://localhost:3000')