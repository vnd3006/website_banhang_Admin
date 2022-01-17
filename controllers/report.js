const report = require('../models/report');
const product = require('../models/product');

exports.top = async (req, res, next) => {
    const ORDERS = await report.list();
    const listCategory = await product.listCategory();

    const listCategoryId = listCategory.map(item => item.id)

    
    const data = []
    
    // const data = []
    for(let i =0 ;i<10;i++){
        let id = ORDERS[i].categoryId
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
        let sp ={...ORDERS[i],categoryName: nameCategory}
        data.push(sp)
    }
  
    res.render('report/top',{data})
};     