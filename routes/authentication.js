var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/signIn', function(req, res, next) {
  res.render('authentication/signIn');
});


router.get('/detail', function(req, res, next) {
    res.render('authentication/detail');
  });
  
module.exports = router;
