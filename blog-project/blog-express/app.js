const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

const app = express();

// 写入access日志
const ENV = process.env.NODE_ENV
if(ENV !== 'production') {
  // 开发/测试 环境
  app.use(logger('dev', {
    stream: process.stdout // 默认配置
  }));
}else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName,{
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})

// 解析 session
app.use(session({
  // resave: false,
  // saveUninitialized: true,
  secret: 'WJiol_#9089_',
  cookie: {
    // path: '/',      // 默认配置
    // httpOnly: true, // 默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}))

// app.use('/', indexRouter); 
// app.use('/users', usersRouter);
app.use('/api/blog/', blogRouter)
app.use('/api/user/', userRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  console.log('err: ', err);

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
