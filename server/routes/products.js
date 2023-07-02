var express = require('express');
var router = express.Router();

/* *********************   */
/*  前缀为 [ /products ]   */
/* *********************  */

const query = require('@/db');

router.get('/percent80', async (req, res, next) => {
  const dbRes = await query('SELECT * FROM products WHERE discount = 0.8 ORDER BY RAND() LIMIT 8;')

  res.send({
    code: '1',
    msg: '操作成功',
    result: {
      items: dbRes
    }
  });
})
router.get('/details', async (req, res, next) => {

  const {id} = req.query
  console.log("id", id)

  const dbRes = await query(`SELECT data FROM details WHERE id = ${id}`)

  res.send({
    code: '1',
    msg: '操作成功',
    result: JSON.parse(dbRes[0].data)
  });
})

/* GET users listing. */
router.get('/', async (req, res, next) => {

  const { page, pageSize, keyword, onlyDiscount, sortField, sortMethod } = req.query;

  // 完整语句
  // SELECT * FROM products 
  // WHERE (name LIKE '%苹果%' OR description LIKE '%苹果%') 
  // AND discount < 1 
  // ORDER BY publishTime DESC 
  // LIMIT 0,6;

  // 设定默认值
  const newPage = +page || 1
  const newPageSize = +pageSize || 10
  const newKeyword = keyword || false
  const newOnlyDiscount = onlyDiscount == 'true' ? 1 : 0
  const newSortField = sortField || ` orderNum `
  const newSortMethod = sortMethod || ` DESC `
  console.log("newOnlyDiscount", newOnlyDiscount)

  // 构建查询语句
  let sql = `SELECT * FROM products WHERE discount != ${newOnlyDiscount} `;
  let countSql = `SELECT COUNT(*) AS count FROM products WHERE discount != ${newOnlyDiscount} `;
  if (newKeyword) {
    // sql += ` AND (name LIKE '%${newKeyword}%' OR description LIKE '%${newKeyword}%') `
    // countSql += ` AND (name LIKE '%${newKeyword}%' OR description LIKE '%${newKeyword}%') `
    sql += ` AND (name REGEXP '[${newKeyword}]' OR description REGEXP '[${newKeyword}]') `
    countSql += ` AND (name REGEXP '[${newKeyword}]' OR description REGEXP '[${newKeyword}]') `
  }
  sql += ` ORDER BY ${newSortField} ${newSortMethod} `
  sql += ` LIMIT ${(newPage - 1) * newPageSize} , ${newPageSize} ;`

  let count = 0
  
  console.log("sql", sql)
  const countResults = await query(countSql)
  count = countResults[0].count

  const dbRes = await query(sql)
  const result = {
    pageData: {
      counts: count,
      pagesize: newPageSize,
      pages: Math.ceil(count / pageSize),
      page: newPage,
      items: dbRes,
    }
  }

  res.send({
    code: '1',
    msg: '操作成功',
    result
  });

});



module.exports = router;