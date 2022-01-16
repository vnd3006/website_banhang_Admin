const {dbs} = require('../dbs')

module.exports = async (req,res,next) =>{
   try{
    const account = await dbs.production.collection('admin').findOne({username: req.body.username})
    console.log('===============account=====',account)
    if(account.isVerified){
        return next();
    }
    return res.redirect('/admin/SignIn')
   } catch(error){
       console.log("========error",error)
       return res.redirect('/admin/SignIn')
   }
}