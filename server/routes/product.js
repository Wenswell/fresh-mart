var express = require('express');
var router = express.Router();

/* ******************   */
/*  前缀为 [ /product ]   */
/* ******************  */

const query = require('@/db');


/* GET users listing. */
router.get('/', function (req, res, next) {
  // 调用查询函数并输出结果
  query('SELECT * FROM products WHERE oldPrice < 10;', (err, results) => {
    if (err) throw err;

    res.send(results);
  });
});

module.exports = router;