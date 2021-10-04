const http = require('http')  // commonjs
// require 三个层级 1. 系统自带的模块; 2. npm 安装的; 3. 自定义

const querystring = require('querystring')

// req:Request, res:Response
const server  = http.createServer((req, res) => {

	const url = req.url
	const path = url.split('?')[0]
	const queryStr = url.split('?')[1]
	const method = req.method

	const query = querystring.parse(queryStr || '')

	// 定义路由: 模拟获取留言板列表
	if(path === '/api/list' && method === 'GET'){
		// res.end('this is list router')

		const result = {
			errno: 0,
			data: [
				{ user: '张三', content: '留言 1'},
				{ user: '李四', content: '留言 2'}
			]
		}

		res.writeHead(200, {
			'Content-Type': 'application/json'
		})

		res.end( JSON.stringify(result) ) // 以 "流" 的形式返回到浏览器
	}

	// 路由定义: 模拟创建留言
	if(path === '/api/create' && method === 'POST'){
		
		let bodyStr = ''

		const reqType = req.headers['content-type']

		console.log(req.headers)

		req.on('data', chunk => { // 服务端怎么识别"流", 并接受数据
			// chunk 即 "流" 的每一段数据
			bodyStr += chunk.toString()
		})

		req.on('end', () => { // 服务端怎么知道流完了
			if(reqType === 'application/json'){
				const body = JSON.parse(bodyStr)
				console.log('bodyStr is ', body)
			}
			
			res.end('接收完成')
		})

		// const result = {
		// 	errno: 0,
		// 	msg: '创建成功'
		// }

		// res.writeHead(200, {
		// 	'Content-Type': 'application/json'
		// })

		// res.end(
		// 	JSON.stringify(result)
		// )

		return
	}

	// 没有明中路由
	// res.end('404') 

	// res.writeHead(404, { 'Content-Type': 'text/plain' } )
	// res.end(' 404 Not Found')
	res.writeHead(404, { 'Content-Type': 'text/html' } )
	res.end(`
		<!DOCTYPE html>
		<html>
			<head>
				<title>404</title>
			</head>
			<body>
				<h1>404</h1>
			</body>
		</html>
	`)
})

server.listen(3000, () => {}) // 监听 http 请求
console.log('http 请求已经被监听, 3000 端口, 请访问 http://localhost:3000')