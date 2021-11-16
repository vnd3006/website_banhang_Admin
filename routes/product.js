var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/add', function(req, res, next) {
  res.render('product/add');
});

router.get('/delete', function(req, res, next) {
    res.render('product/delete');
});

router.get('/edit', function(req, res, next) {
    res.render('product/edit');
  });

router.get('/update', function(req, res, next) {
res.render('product/update');
});
router.get('/', function(req, res, next) {
res.render('product/index');
});


  
module.exports = router;
