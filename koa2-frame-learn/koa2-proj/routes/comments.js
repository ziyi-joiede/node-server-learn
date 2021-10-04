const router = require('koa-router')()

router.prefix('/api')

// 定义路由: 模拟获取留言板列表
router.get('/list', async (ctx) => {
	// querystring ctx.query // req 的功能
	console.log(ctx.query)
	const result = {
		errno: 0,
		data: [
			{ user: '张三', content: '留言 1'},
			{ user: '李四', content: '留言 2'}
		]
	}
	ctx.body = result // res 的功能
})

// 路由定义: 模拟创建留言
router.post('/create', async (ctx) => {
	const body = ctx.request.body //request body

	console.log(body)

	ctx.body = 'api create'
})

module.exports = router