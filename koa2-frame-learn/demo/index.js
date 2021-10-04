const Koa = require('koa') // commonjs
const app = new Koa()

// ctx context 上下文
app.use(async (ctx) => {
	ctx.body = 'hello world'
})

app.listen(3000)

