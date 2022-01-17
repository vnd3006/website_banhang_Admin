const product = require('../models/product');

exports.index = async (req, res, next) => {
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
    res.render('index',{ productData });
};