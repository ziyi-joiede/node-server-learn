const { login } = require('../controller/user')
const { 
	SuccessModel, 
	ErrorModel 
} = require('../model/resModel')
const {
  set
} = require('../db/redis')


const handleUserRouter = (req, res) => {
	const {method, path} = req
		// if(result) {
		// 	return new SuccessModel()
		// }else {
		// 	return new ErrorModel('登录失败')
		// }

	// 登录
	if(method === 'POST' && path === '/api/user/login'){
		const { username, password } = req.body
		// const { username, password } = req.query


		const result = login(username, password)
		return result.then(rows => {
			const data = rows[0] || {}
			if(data.username){

				// 操作 cookie,
				// httpOnly: 只允许通过后端改,不允许在前端改, document.cookie 访问不到
				// res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)

				// 设置 session

				req.session.username = data.username
				req.session.realname = data.realname
				set(req.sessionId, req.session)
				return new SuccessModel()
			}
			return new ErrorModel('登录失败')
		})
	}

	// 登录验证测试
	// if(method === 'GET' && req.path === '/api/user/login-test') {
	// 	// if(req.cookie.username){
	// 	// 	return Promise.resolve(
	// 	// 		new SuccessModel({
	// 	// 			username: req.cookie.username
	// 	// 		})
	// 	// 	)
	// 	// }

	// 	if(req.session.username){
	// 		return Promise.resolve(
	// 			new SuccessModel({
	// 				username: req.session.username
	// 			})
	// 		)
	// 	}

	// 	return Promise.resolve(
	// 		new ErrorModel('尚未登录')
	// 	)
	// }
}

module.exports = handleUserRouter