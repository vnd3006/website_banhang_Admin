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
        name:req.body.name,
        catalogId:req.body.catalogId,
        id:req.body.id,
        price:Number(req.body.price),
        discount:Number(req.body.discount),
        content:req.body.content,
        imageLink:req.body.imageLink
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
        catalogId:req.body.catalogId,
        id:req.body.id,
        price:Number(req.body.price),
        discount:Number(req.body.discount),
        content:req.body.content,
        imageLink:req.body.imageLink
    }
    await product.update(id,data);
    res.redirect('../update');
};