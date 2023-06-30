const express = require('express')
const router = express.Router()

// 以下为通用匹配

// GET 请求处理程序
router.get('/*', function(req, res, next) {
  const { method, path, params, headers, cookies, body, ip, protocol, query } = req;
  res.render('wildcard', { method, path, params, headers, cookies, body, ip, protocol, query });
});

// POST 请求处理程序
router.post('/*', function(req, res, next) {
  const { method, path, params, headers, cookies, body, ip, protocol, query } = req;
  res.render('wildcard', { method, path, params, headers, cookies, body, ip, protocol, query });
});

// PUT 请求处理程序
router.put('/*', function(req, res, next) {
  const { method, path, params, headers, cookies, body, ip, protocol, query } = req;
  res.render('wildcard', { method, path, params, headers, cookies, body, ip, protocol, query });
});

// DELETE 请求处理程序
router.delete('/*', function(req, res, next) {
  const { method, path, params, headers, cookies, body, ip, protocol, query } = req;
  res.render('wildcard', { method, path, params, headers, cookies, body, ip, protocol, query });
});

// 导出路由 
module.exports = router