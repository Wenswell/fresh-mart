var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/images', require('./images'));
router.use('/manager', require('./manager'));

router.use(require('@/routes/wildcard'));

module.exports = router;
