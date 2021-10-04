const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
