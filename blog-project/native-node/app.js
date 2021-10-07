const querystring = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

/**
 * @description 用于处理 post 请求的 data
 * @param { object } req 
 */
const getPostData = req => {
	const promise =  new Promise((resolve, reject) => {
		if(req.method !== 'POST') {
			resolve({})
			return
		}

		if(req.headers['content-type'] !== 'application/json') {
			resolve({})
			return
		}

		let postData = ''
		req.on('data', chunk => {
			postData += chunk.toString()
		})
		req.on('end', () => {
			if(!postData){
				resolve({})
				return
			}
			
			resolve(
				JSON.parse(postData)
			)
		})
	})

	return promise
}

const serverHandle = (req, res) => {
	// 设置返回格式
	res.setHeader('Content-Type', 'application/json')

	// 获取 path
	const {url} = req
	req.path = url.split('?')[0]

	// 解析 query
	req.query = querystring.parse(url.split('?')[1])

	// 处理 postData
	getPostData(req).then(postData => {
		req.body = postData


		// 处理路由

		// 处理 blog 路由
		// const blogData = handleBlogRouter(req, res)
		const blogResult = handleBlogRouter(req, res)
		if(blogResult){
			blogResult.then(blogData => {
				if(blogData){
					res.end(
						JSON.stringify(blogData)
					)
				}	
			})
			return
		}
		
		// 处理 user 路由
		// const userData = handleUserRouter(req, res)
		// if(userData){
		// 	res.end(
		// 		JSON.stringify(userData)
		// 	)
		// 	return
		// }
		const userResult = handleUserRouter(req, res)
		if(userResult){
			userResult.then(userData => {
				res.end(
					JSON.stringify(userData)
				)
			})
			return
		}

		// 未命中路由,返回 404
		res.writeHead(404, {
			'Content-Type': 'text/plain'
		})
		res.write('404 Not Found\n')
		res.end()

	})

  
}

module.exports = serverHandle