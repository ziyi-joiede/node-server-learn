const router = require('koa-router')()

const { 
	getList, 
	getDetail,
	newBlog,
	updateBlog,
	delBlog 
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')  
router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
	let author = ctx.query.author || ''
	const keyword = ctx.query.keyword || ''

	if(ctx.query.isadmin) {
		console.log('is admin')
		if(ctx.session.username === null) {
			console.error('is admin, but no login')
			// 未登录
			ctx.body = new ErrorModel('未登录')
			return
		}
		author = ctx.session.username 
	}

	const listData = await getList(author, keyword)
	ctx.body = new SuccessModel(listData)
})

router.get('/detail', async (ctx, next) => {
	const data = await getDetail(ctx.query.id)
	ctx.body = new SuccessModel(data[0])
})

router.post('/new', loginCheck, async (ctx, next) => {
	const author = ctx.session.username
	ctx.request.body.author = author

	try {
		const insertData = await newBlog(ctx.request.body)
		ctx.body = new SuccessModel({
			id: insertData.insertId
		})
	}catch(err) {
		console.log(err);
	}
})

router.post('/update', loginCheck, async (ctx, next) => {
	const updateData = await updateBlog(ctx.query.id, ctx.request.body)
	if(updateData.affectedRows > 0)	{
		ctx.body = new SuccessModel('')
	}
	else {
		ctx.body = new ErrorModel('更新博客失败')
	}
})

router.post('/del', loginCheck, async (ctx, next) => {
	const author = ctx.session.username
	const delData = await delBlog(ctx.query.id, author)
	if(delData.affectedRows > 0) {
		ctx.body = new SuccessModel()
		return
	}
	ctx.body = new ErrorModel('删除博客失败!')

})

module.exports = router