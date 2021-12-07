const admin = require('../models/admin');
const bcrypt = require('bcrypt');
const passport = require('../auth/passport')

exports.signUp = async (req, res, next) => {
    res.render('admin/signUp')
};

exports.detail = async (req, res, next) => {
    res.render('admin/detail')
};


exports.list = async (req, res, next) => {
    const data = await admin.list();
    res.render('admin/list', { data })
};
exports.signUpPost = async (req, res, next) => {

    const body=req.body;
    const hashPassword = bcrypt.hashSync(body.password, 10); 
    const data = {
        name:body.name,
        username:body.username,
        password:hashPassword
    }
    const listUser = await admin.list();
    let count = 0;
        for(let i=0;i<listUser.length;i++){
            if(listUser[i].username == data.username) {
                console.log("tontai");
                count++;
                break;
            }
        }
        if(count == 0){
            await admin.add(data);
            res.render('admin/signIn')
        }
        else{
            const thongBao = 'Tên Đăng nhập đã tồn tại'
            res.render('admin/signUp', {thongBao})
        }   
};



exports.signIn = async (req, res, next) => {
    res.render('admin/signIn')
};

// exports.signInPost = async (req, res, next) => {
//     console.log("123");
//     passport.authenticate('local', {
//         successRedirect: '/', 
//         failureRedirect: 'admin/signIn' })
//     // router.post('/admin/SignIn', 
//     //    ),
//     // function(req, res) {
//     //     res.redirect('/');
//     // });
//     // const body=req.body;
//     // const data = await admin.list();
//     // var count=0;
//     // for(var i=0;i<data.length;i++){
//     //     if(bcrypt.compareSync(body.password, data[i].password)) {
//     //         count++;          
//     //         res.render('index');
//     //     }
//     // }  
//     // if(count==0){
//     //     const thongBao="Tên đăng nhập hoặc mật khẩu không chính xác";
//     //     res.render('admin/signIn',{thongBao});
//     // }   
// };