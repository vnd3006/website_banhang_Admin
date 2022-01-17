const product = require('../models/product');

exports.index =  async (req, res, next) => {
    const data = await product.list();
    // const productData = await product.list();
    const listCategory = await product.listCategory();

    const listCategoryId = listCategory.map(item => item.id)

    const productData =[]

    for(let i = 0 ;i < data.length; i++){

        let id = data[i].categoryId
        let nameCategory;
        for(let j =0; j<listCategory.length;j++)
        {
            if( id === listCategory[j].id)
            {
                nameCategory = listCategory[j].name;
                break;
            }
        }
        //let nameCategory = await product.detailCategory(data[i].categoryId)
        let sp ={...data[i],categoryName: nameCategory}
        productData.push(sp)
    }

    res.render('product/index', { productData })
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
    const listCategory = await product.listCategory();

    const listCategoryId = listCategory.map(item => item.id)

    const productData =[]

    for(let i = 0 ;i < data.length; i++){

        let id = data[i].categoryId
        let nameCategory;
        for(let j =0; j<listCategory.length;j++)
        {
            if( id === listCategory[j].id)
            {
                nameCategory = listCategory[j].name;
                break;
            }
        }
        //let nameCategory = await product.detailCategory(data[i].categoryId)
        let sp ={...data[i],categoryName: nameCategory}
        productData.push(sp)
    }
    res.render('product/delete',{ productData });
};

exports.deleteProduct = async (req, res, next) => {
    const id = req.params['id'];
    // await product.delete(id);
    const infor ={show : false}
    await product.update(id,infor)
    res.redirect('/product/delete');
};

exports.update = async (req, res, next) => {
    const data = await product.list();
    const listCategory = await product.listCategory();

    const listCategoryId = listCategory.map(item => item.id)

    const productData =[]

    for(let i = 0 ;i < data.length; i++){

        let id = data[i].categoryId
        let nameCategory;
        for(let j =0; j<listCategory.length;j++)
        {
            if( id === listCategory[j].id)
            {
                nameCategory = listCategory[j].name;
                break;
            }
        }
        //let nameCategory = await product.detailCategory(data[i].categoryId)
        let sp ={...data[i],categoryName: nameCategory}
        productData.push(sp)
    }
    res.render('product/update',{ productData });
};

exports.edit = async (req, res, next) => {
    const id = req.params['id'];
    const dataProduct = await product.detail(id);
    const category = await product.detailCategory(dataProduct.categoryId)
    const discount = dataProduct.discount * 100
    const data = {...dataProduct,nameCategory: category.name, displaydiscount: discount}
    res.render('product/edit',{ data });
};

exports.updatePost = async (req, res, next) => {
    const id = req.params['id'];
    const data = {
        name:req.body.name,
        categoryId:req.body.categoryId,
        id:req.body.id,
        price:Number(req.body.price),
        discount:Number(req.body.discount/100),
        content:req.body.content,
        imageLink:req.body.imageLink
    }
    await product.update(id,data);
    res.redirect('../update');
};