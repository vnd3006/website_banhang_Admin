module.exports = (req, res, next) =>{
    if(!req.user){
        res.redirect('/admin/signIn')
    }else{
        next()
    }
}