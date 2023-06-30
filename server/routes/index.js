var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.use('/user', require('./user'));
router.use('/product', require('./product'));

router.use(require('@/routes/wildcard'));

module.exports = router;
