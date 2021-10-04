const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  // 渲染到 views 中的 index.pug
  // title 对应 index.pug 中的 title
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
