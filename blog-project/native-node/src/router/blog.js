const { 
	getList, 
	getDetail,
	newBlog,
	updateBlog,
	delBlog 
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登录验证函数
const loginCheck = req => {
	if(!req.session.username){
		return Promise.resolve(
			new ErrorModel('尚未登录')
		)
	}

}

const handleBlogRouter = (req, res) => {
	const {method, path} = req
	const id = req.query.id 

	// 获取博客列表
	if (method === 'GET' && path === '/api/blog/list') {
		
		let author = req.query.author || ''
		const keyword = req.query.keyword || ''
		// const listData = getList(author, keyword)

		// return new SuccessModel(listData)

		if(req.query.isadmin) {
			const loginCheckResult = loginCheck(req)
			if(loginCheckResult) {
				// 未登录
				return loginCheckResult
			}
			// 强制查询自己的博客
			author = req.session.username 
		}

		const result = getList(author, keyword)
		return result.then(listData => {
			return new SuccessModel(listData)
		})
	}

	// 获取博客详情
	if (method === 'GET' && path === '/api/blog/detail'){

		// const resData = getDetail(id)
		// return new SuccessModel(resData)

		const result = getDetail(id)
		return result.then(data => {
			return new SuccessModel(data[0])
		})

	}

	// 新建一篇博客
	if(method === 'POST' && path === '/api/blog/new'){
		// const blogData = req.body
		// const data = newBlog(req.body)
		// return new SuccessModel(data)

		const loginCheckResult = loginCheck(req)
		if(loginCheckResult) {
			// 未登录
			return loginCheckResult
		}

		// const author = 'zhangsan' // 假数据,带开发登录时再改成真数据
		
		const author = req.session.username
		req.body.author = author
		return newBlog(req.body).then(insertData => {
			return new SuccessModel({
				id: insertData.insertId
			}) 
		})

	}

	// 更新一篇博客
	if(method === 'POST' && path === '/api/blog/update'){

		// const result = updateBlog(id, req.body)

		// if(result) {
		// 	return new SuccessModel('')	
		// }else {
		// 	return new ErrorModel('更新博客失败')
		// }

		const loginCheckResult = loginCheck(req)
		if(loginCheckResult) {
			// 未登录
			return loginCheckResult
		}

		const result = updateBlog(id, req.body)
		return result.then(updateData => {
			if(updateData.affectedRows > 0)	{
				return new SuccessModel('')}
			else {
				return new ErrorModel('更新博客失败')
			}
		})
	}

	// 删除一篇博客
	if(method === 'POST' && path === '/api/blog/del'){

		const loginCheckResult = loginCheck(req)
		if(loginCheckResult) {
			// 未登录
			return loginCheckResult
		}

		// const author = 'zhangsan' // 假数据,带开发登录时再改成真数据

		const author = req.session.username
		const result = delBlog(id, author)
		return result.then(delData => {
			console.log('deleteData is ', delData)
			if(delData.affectedRows > 0) {
				return new SuccessModel()
			}
			return new ErrorModel('删除博客失败!')
		})
	}
}

module.exports = handleBlogRouter