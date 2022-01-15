const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');
const passport = require('../auth/passport')

router.get('/signUp', admin.signUp);
router.post('/signUp', admin.signUpPost);
router.get('/logOut',(req,res)=>{
    req.logOut();
    res.redirect('/admin/signIn')
})

router.get('/list', admin.list );
router.get('/detail', admin.detail );
router.post('/detail',admin.updateiInfor)

router.get('/forgotPassword', admin.forgotPassword)
router.get('/changePassword',admin.changePassword)
router.post('/changePassword',admin.changePasswordPost)

router.get('/signIn', admin.signIn);
// router.post('/signIn', admin.signInPost);
router.post('/signIn',
passport.authenticate('local',{
    failureRedirect: '/admin/signIn?wrongPassword',
    successRedirect: '/',
    // failureFlash: true
}))

module.exports = router;