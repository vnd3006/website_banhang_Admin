const express = require('express');
const router = express.Router();
const order = require('../controllers/order');

router.get('/delivery', order.delivery);//Chưa giao hàng
router.get('/delivery/:id', order.delivery_detail); // danh sach mặt hành

router.get('/delivered', order.delivered);//Đã giao hàng
router.get('/delivered/:id', order.todelevered);


router.get('/delivering', order.delivering);//Đang giao hàng
router.get('/delivering/:id', order.todelivering);//Giao hàng

module.exports = router;

