const querystring = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const { set, get } = require('./src/db/redis')
const { access } = require('./src/utils/log')

// 获取 cookie 的过期时间
const getCookieExpires = () => {
	const d = new Date()
	d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
	return d.toGMTString()
}

// session 数据
const SESSION_DATA = {}

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
	// 记录 access log
	access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']}`)

	// 设置返回格式
	res.setHeader('Content-Type', 'application/json')

	// 获取 path
	const {url} = req
	req.path = url.split('?')[0]

	// 解析 query
	req.query = querystring.parse(url.split('?')[1])

	// 解析 cookie
	req.cookie = {}
	const cookieStr = req.headers.cookie || '' // k1=v1;k2=v2;k3=v3
	cookieStr.split(';').forEach(item => {
		if(!item) {
			return
		}
		const key = item.split('=')[0].trim()
		const val = item.split('=')[1].trim()
		req.cookie[key] = val
	})

	// 解析 session
	// let needSetCookie = false
	// let userId = req.cookie.userid
	// if(userId) {
	// 	// if(SESSION_DATA[userId]){
	// 	// 	req.session = SESSION_DATA[userId]
	// 	// }else {
	// 	// 	SESSION_DATA[userId] = {}
	// 	// 	req.session = SESSION_DATA[userId]
	// 	// }

	// 	// 简化
	// 	if(!SESSION_DATA[userId]){
	// 		SESSION_DATA[userId] = {}
	// 	}
	// 	// req.session = SESSION_DATA[userId]
	// }else {
	// 	needSetCookie = true
	// 	userId = `${Date.now()}_${Math.random()}}`
	// 	SESSION_DATA[userId] = {}
	// 	// req.session = SESSION_DATA[userId]
	// }
	// req.session = SESSION_DATA[userId]

	// 解析 session (使用 redis)
	let needSetCookie = false
	let userId = req.cookie.userid
	if(!userId) {
			needSetCookie = true
			userId = `${Date.now()}_${Math.random()}`
			// 初始化 redis 中的 session 的初始值
			set(userId, {})
	}
	// 为 req 创建一个 sessionId 属性
	req.sessionId = userId
	get(req.sessionId)
	.then(sessionData => {
		if(!sessionData) {
			// 初始化 redis 中的 session 中的初始值
			set(req.sessionId, {})
			// 设置 session
			res.session = {}
		}else {
			req.session = sessionData
		}
		return getPostData(req)
	})
	.then(postData => {
		req.body = postData
		const blogResult = handleBlogRouter(req, res)
		if(blogResult){
			blogResult.then(blogData => {
				if(needSetCookie){
					res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
				}
				
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
				if(needSetCookie){
					res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
				}

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
	

	// 处理 postData
	// getPostData(req).then(postData => {
		// req.body = postData


		// 处理路由

		// 处理 blog 路由
		// const blogData = handleBlogRouter(req, res)
		// const blogResult = handleBlogRouter(req, res)
		// if(blogResult){
		// 	blogResult.then(blogData => {
		// 		if(needSetCookie){
		// 			res.setHeader('Set-Cookie',`userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
		// 		}
				
		// 		if(blogData){
		// 			res.end(
		// 				JSON.stringify(blogData)
		// 			)
		// 		}	
		// 	})
		// 	return
		// }
		
		// // 处理 user 路由
		// // const userData = handleUserRouter(req, res)
		// // if(userData){
		// // 	res.end(
		// // 		JSON.stringify(userData)
		// // 	)
		// // 	return
		// // }
		// const userResult = handleUserRouter(req, res)
		// if(userResult){
		// 	userResult.then(userData => {
		// 		if(needSetCookie){
		// 			res.setHeader('Set-Cookie',`userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
		// 		}

		// 		res.end(
		// 			JSON.stringify(userData)
		// 		)
		// 	})
		// 	return
		// }

		// // 未命中路由,返回 404
		// res.writeHead(404, {
		// 	'Content-Type': 'text/plain'
		// })
		// res.write('404 Not Found\n')
		// res.end()

	// })

  
}

module.exports = serverHandle