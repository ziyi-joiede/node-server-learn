// 演示  koa2 中间件的洋葱圈模型

const Koa = require('koa')
const app = new Koa()


// 注册 logger 中间件  ctx = req + res 的集合
app.use(async (ctx, next) => {
	await next() // 执行下一个中间件
	
	// 下一个中间件执行完, 才会执行此段代码
	// ctx.response -> res
	const rt = ctx.response.get('X-Response-Time') // 获取时间差
	console.log( `${ctx.method} ${ctx.url} ${rt}` )
})

// 注册 x-response-time 中间件
app.use(async (ctx, next) => {
	// TODO
	const start = new Date()
	await next() // 执行下一个中间件
	const ms = Date.now() - start // 计算 await next() 的时间差
	ctx.set('X-Response-Time', `${ms}ms`) // 设置/记录 时间差
})

// 注册 response 中间件
app.use(async (ctx, next) => {
	ctx.body = 'hello world'
})

// 当有请求的时候, 中间件才会执行

app.listen(3000)
console.log('koa2 已经开始监听 3000 端口')