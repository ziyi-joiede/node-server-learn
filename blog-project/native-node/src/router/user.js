const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')


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

		const result = loginCheck(username, password)
		return result.then(rows => {
			const res = rows[0] || {}
			if(res.username){
				return new SuccessModel()
			}
			return new ErrorModel('登录失败')
		})
	}
}

module.exports = handleUserRouter