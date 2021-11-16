var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/list');
});

router.get('/lock_list', function(req, res, next) {
  res.render('users/lockList');
});

router.get('/unlock_list', function(req, res, next) {
  res.render('users/unlockList');
});

router.get('/detail', function(req, res, next) {
  res.render('users/detail');
});

module.exports = router;
