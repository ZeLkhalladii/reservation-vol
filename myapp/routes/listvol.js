var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('listVol');
});

router.post('/', function(req, res, next) {
    res.redirect('/formPaiment')
  });

module.exports = router;
