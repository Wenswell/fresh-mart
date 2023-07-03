// module-alias changes the default behavior of require
// 必须放在最开始
require('module-alias/register')
// 引入 module-alias 定义路径别名
const moduleAlias = require('module-alias')

moduleAlias.addAlias('@', __dirname)
moduleAlias.addAlias('@db', __dirname + '/db')
// moduleAlias.addAlias('@utils', __dirname + '/utils')
// moduleAlias.addAlias('@config', __dirname + '/utils/config')
moduleAlias.addAlias('@router', __dirname + '/router')
moduleAlias.addAlias('@public', __dirname + '/public')

require('@/public/javascripts/test/test-22-02');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// 全局中间件
// 固定代码：开放跨域请求
app.use(function (req, res, next) {
  // 允许来自所有域名的请求
  res.header("Access-Control-Allow-Origin", "*");
  // 允许请求带有Content-Type头
  res.header("Access-Control-Allow-Headers", "*");
  // 允许的HTTP方法
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  // 如果是预检请求(OPTIONS),则直接返回状态200
  if (req.method == "OPTIONS") res.sendStatus(200);
  // 不是预检请求,则继续向下执行其他路由或中间件函数
  else next();
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
