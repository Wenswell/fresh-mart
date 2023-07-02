var express = require('express');
var router = express.Router();

/* *********************   */
/*  前缀为 [ /images ]   */
/* *********************  */

const query = require('@/db');

router.get('/home/banner', async (req, res, next) => {
  const dbRes = await query(`SELECT * FROM images WHERE position = 'homeBanner' ORDER BY RAND() LIMIT 4;`)

  res.send({
    code: '1',
    msg: '操作成功',
    result: {
      images:dbRes
    }
  });
})



module.exports = router;