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
    const img = [];
    img.push(req.body.imageLink1)
    if(req.body.imageLink2 != '')
    {

        img.push(req.body.imageLink2)
    }
    if(req.body.imageLink3!= '')
    {

        img.push(req.body.imageLink3)
    }

    
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
        imagesList:img,
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
    if(dataProduct.imagesList.length == 2){
        imageLink2 = dataProduct.imageLink[1]
        imageLink3 =''
    }else if(dataProduct.imageLink.length == 3){
        imageLink2 = dataProduct.imageLink[1]
        imageLink3 = dataProduct.imageLink[2]
    }
    else{
        imageLink2 = ''
        imageLink3 = ''
    }
    const category = await product.detailCategory(dataProduct.categoryId)
    const discount = dataProduct.discount * 100
    const data = {...dataProduct,nameCategory: category.name, displaydiscount: discount, imageLink1: dataProduct.imageLink[0], imageLink2: imageLink2, imageLink3: imageLink3}
    res.render('product/edit',{ data });
};

exports.updatePost = async (req, res, next) => {
    const id = req.params['id'];
    const img = [];
    img.push(req.body.imageLink1)
    if(req.body.imageLink2 != '')
    {

        img.push(req.body.imageLink2)
    }
    if(req.body.imageLink3!= '')
    {

        img.push(req.body.imageLink3)
    }
    const data = {
        name:req.body.name,
        categoryId:req.body.categoryId,
        id:req.body.id,
        price:Number(req.body.price),
        discount:Number(req.body.discount/100),
        content:req.body.content,
        imagesList:img
    }
    await product.update(id,data);
    res.redirect('../update');
};