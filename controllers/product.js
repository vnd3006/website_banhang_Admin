const product = require('../models/product');

exports.index =  async (req, res, next) => {
    const data = await product.list();
    res.render('product/index', { data })
};

exports.add = (req, res, next) => {
    res.render('product/add');
};

exports.addPost = async (req, res, next) => {
    const data = {
        id:req.body.id,
        categoryId:req.body.categoryId,
        name:req.body.name,
        content:req.body.content,
        price:Number(req.body.price),
        discount:req.body.discount/100,
        soldCount: Number(0),
        rateCount: Number(0),
        rate: [],
        comment: [],
        imageLink:req.body.imageLink,
        show: true,
    }
    await product.add(data);
    res.redirect('./');
};

exports.delete = async (req, res, next) => {
    const data = await product.list();
    res.render('product/delete',{ data });
};

exports.deleteProduct = async (req, res, next) => {
    const id = req.params['id'];
    await product.delete(id);
    res.redirect('../delete');
};

exports.update = async (req, res, next) => {
    const data = await product.list();
    res.render('product/update',{ data });
};

exports.edit = async (req, res, next) => {
    const id = req.params['id'];
    const data = await product.detail(id);
    res.render('product/edit',{ data });
};

exports.updatePost = async (req, res, next) => {
    const id = req.params['id'];
    const data = {
        name:req.body.name,
        categoryId:req.body.categoryId,
        id:req.body.id,
        price:Number(req.body.price),
        discount:Number(req.body.discount),
        content:req.body.content,
        imageLink:req.body.imageLink
    }
    await product.update(id,data);
    res.redirect('../update');
};