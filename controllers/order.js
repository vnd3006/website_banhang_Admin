const { list } = require('mongodb/lib/gridfs/grid_store');
const order = require('../models/order');
const product = require('../models/product');
const users = require('../models/users')

exports.delivery = async (req, res, next) => {
    const data = await order.delivery();
    const datadelivery = [];
    for(let i = 0;i<data.length;i++){
        let UserName = await users.detailUser(data[i].userId)

        let sp ={...data[i],name:UserName.name}
        datadelivery.push(sp)
    }

    res.render('order/delivery',{datadelivery})
};
exports.delivery_detail = async (req, res, next) => {
    const id = req.params['id'];

    const ORDER = await order.detail(id);
    const data =[];
    const listId = ORDER.productList;
    // const productz = await product.detail()
    for(var i=0;i<listId.length;i++){

        let PRODUCT = await product.detailProduct(listId[i].productId);
    
        let sp ={orderId: ORDER.id, id:listId[i].productId, name: PRODUCT.name, quantity: listId[i].quantity, price: listId[i].price }
        data.push(sp)
    }
 
    res.render('order/detail',{data})
};

exports.delivered = async (req, res, next) => {
    const data = await order.delivered();
    const datadelivery = [];
    for(let i = 0;i<data.length;i++){
        let UserName = await users.detailUser(data[i].userId)
        let sp ={...data[i],name:UserName.name}
        datadelivery.push(sp)
    }
    res.render('order/delivered',{datadelivery})
    // res.render('order/delivered',{data})
};




exports.todelevered = async (req, res, next) => { //Giao hàng
    const id = req.params['id'];
    await order.updateDelevered(id);
    res.redirect('/order/delivering')
};

exports.todelivering = async (req, res, next) => { //Giao hàng
    const id = req.params['id'];
    await order.updateDelevering(id);
    res.redirect('/order/delivery')
};

exports.delivering = async (req, res, next) => {
    const data = await order.delivering();
    const datadelivery = [];
    for(let i = 0;i<data.length;i++){
        let UserName = await users.detailUser(data[i].userId)
        let sp ={...data[i],name:UserName.name}
        datadelivery.push(sp)
    }
    res.render('order/delivering',{datadelivery})
    // res.render('order/delivering', {data})
};