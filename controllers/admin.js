const admin = require('../models/admin');
const bcrypt = require('bcrypt');
const passport = require('../auth/passport')

const nodemailer = require("nodemailer");
const {google} = require('googleapis')

const {dbs} = require ('../dbs')

const CLIENT_ID = '941023280533-iusabrkjoaj6166di7am734rb2simlmt.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04p4fukTHdnI8CgYIARAAGAQSNwF-L9IrgOx-_B7-SxTfhhPwaKPLsuFJUnnT2CQAnA5rPZXzVXYVvpO1gErKX8qqC1uICbo9bMA'


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
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
    const token = Math.random().toString(36).substr(2,10);
    const hashPassword = bcrypt.hashSync(body.password, 10); 
    const data = {
        name:body.name,
        email: body.email,
        username:body.username,
        password:hashPassword,
        userToken: token,
        isVerified: false
    }
    // let testAccount = await nodemailer.createTestAccount();
   const accessToken = await oAuth2Client.getAccessToken() 

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',// true for 465, false for other ports
    auth: {
        type: 'OAuth2',
        user: 'websitemihishop@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
    },
  });

  // send mail with defined transport object
  const msg = {
    from: '"MiHi Shop" <websitemihishop@gmail.com>', // sender address
    to: `${body.email}`, // list of receivers
    subject: "verify email required", // Subject line
    text: `
    Xin ch??o ${body.name}
    Vui l??ng x??c nh???n t??i kho???n b???ng c??ch nh???n v??o link b??n d?????i:
    http://${req.headers.host}/admin/verify-email?token=${token}
    `,
  };

 
  
    const listUser = await admin.list();
    let count = 0;
    let mail = 0;
    for(let i=0;i<listUser.length;i++){
        if(listUser[i].username == data.username) {
            count++;
            
            break;
        }
        if(listUser[i].email == data.email) {
            mail++;
            break;
        }
    }
    if(count == 0 && mail ==  0){
        await admin.add(data);
        const info = await transporter.sendMail(msg)
        const thongBao = "????ng k?? th??nh c??ng, vui l??ng ki???m tra email ????? x??c th???c t??i kho???n!"
        res.render('admin/signIn', {thongBao})
    }
    else if(count == 0 && mail!=0) {
        const thongBao = 'Email ???? t???n t???i'
        res.render('admin/signUp', {thongBao})
    } else{
        const thongBao = 'T??n ????ng nh???p ???? t???n t???i'
        res.render('admin/signUp', {thongBao})
    }
    
    
};





exports.signIn = async (req, res, next) => {
    res.render('admin/signIn', {wrongPassword: req.query.wrongPassword !== undefined})
};
exports.forgotPassword = async(req,res) =>{
    res.render('admin/forgotPassword')
}
exports.forgotPasswordPost = async (req, res) =>{
    const body=req.body;
    const account = await dbs.production.collection('admin').findOne({email: body.email})
    if(!account){
        const thongBao = "Email kh??ng t???n t???i!";
        console.log("================account k t???n t???i")
        res.render('admin/forgotPassword', {thongBao})
    }
    else{

        const token = Math.random().toString(36).substr(2,10);
        const hashPassword = bcrypt.hashSync(token, 10); 
    
        const accessToken = await oAuth2Client.getAccessToken() 
    
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: 'gmail',// true for 465, false for other ports
          auth: {
              type: 'OAuth2',
              user: 'websitemihishop@gmail.com',
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken
          },
        });
      
        // send mail with defined transport object
        const msg = {
          from: '"MiHi Shop" <websitemihishop@gmail.com>', // sender address
          to: `${body.email}`, // list of receivers
          subject: "verify email required", // Subject line
          text: `
          M???t kh???u m???i c???a b???n l??: ${token}`, // plain text body
        };
        const info = await transporter.sendMail(msg)
    
        const data = { password: hashPassword}
        
        const thongBao = "Vui l??ng ki???m tra email ????? l???y m???t kh???u!"
        await admin.update(account._id, data)
        res.render('admin/signIn',{thongBao})
    }
}

exports.changePassword = async (req,res) =>{
    res.render('admin/changePassword')
}

exports.changePasswordPost = async(req,res) =>{
    const pass = req.body.password
    const account = await admin.detail(req.user.id)
    const checkpass = bcrypt.compareSync(pass, account[0].password)
    if(checkpass){
        const hashPassword = bcrypt.hashSync(req.body.newpassword, 10); 
        const infor ={
           password: hashPassword
       }
       await admin.update(req.user.id, infor)
       const thongBao = 'Thay ?????i m???t kh???u th??nh c??ng!'
       res.render('admin/changePassword',{thongBao})

    }else{
        const thongBao = 'M???t kh???u kh??ng ch??nh x??c!'
        res.render('admin/changePassword',{thongBao})
    }
    

}

exports.updateiInfor = async (req,res) =>{

    const id = req.user.id;
    const infor = {
        name: req.body.name
    }
    await admin.update(id,infor);
    req.user.name = req.body.name
    res.redirect('/')
}


exports.verifyEmail = async (req,res,next) =>{
        const account = await dbs.production.collection('admin').findOne({userToken: req.query.token})
        if(!account){
            const thongBao = 'Token kh??ng ????ng'
            return res.render('admin/signIn', {thongBao})
        }
        else{
            const infor = {
                userToken: null,
                isVerified: true
            }
            await admin.update(account._id,infor)
            console.log("==========verify thanh cong")
            return res.redirect('admin/signIn')
        }
        // console.log("==================account",account)
}

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
//     //     const thongBao="T??n ????ng nh???p ho???c m???t kh???u kh??ng ch??nh x??c";
//     //     res.render('admin/signIn',{thongBao});
//     // }   
// };
