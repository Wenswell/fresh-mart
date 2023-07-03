var express = require('express');
var router = express.Router();
const query = require('@/db');

/* ******************   */
/*  前缀为 [ /users ]   */
/* ******************  */


/* GET users listing. */
router.get('/address', async (req, res, next) => {
  const dbRes = await query(`SELECT * FROM address`)
  console.log("dbRes", dbRes)

  res.send({
    code: "1",
    msg: "操作成功",
    result: dbRes
  });
});

module.exports = router;