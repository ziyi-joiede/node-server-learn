const router = require('koa-router')()

const { login } = require('../controller/user')
const { 
	SuccessModel, 
	ErrorModel 
} = require('../model/resModel')
router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
	const { username, password } = ctx.request.body
	const rows = await login(username, password)
	const data = rows[0] || {}
	if(data.username){
		ctx.session.username = data.username
		ctx.session.realname = data.realname
		
		ctx.body = new SuccessModel()
		return
	}
	ctx.body = new ErrorModel('登录失败')
		
	// const result = login(username, password)
	// return result.then(rows => {
	// 	const data = rows[0] || {}
	// 	if(data.username){
	// 		req.session.username = data.username
	// 		req.session.realname = data.realname
			
	// 		res.json(
	// 			new SuccessModel()
	// 		)
	// 		return
	// 	}
	// 	res.json(
	// 		new ErrorModel('登录失败')
	// 	)
	// })
})

router.get('/session-test', async (ctx, next) => {
	if(ctx.session.viewCount == null) {
		ctx.session.viewCount = 0
	}
	ctx.session.viewCount++

	ctx.body = {
		errno: 0,
		viewCount: ctx.session.viewCount
	}
})
module.exports = router