var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SafiAir' });
});

router.post('/', function(req, res, next) {
  res.redirect('/listVol')
});


module.exports = router;
