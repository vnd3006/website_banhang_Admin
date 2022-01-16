const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');
const passport = require('../auth/passport')
const auth = require('../auth/authRouter')

router.get('/signUp', admin.signUp);
router.post('/signUp', admin.signUpPost);
router.get('/logOut',(req,res)=>{
    req.logOut();
    res.redirect('/admin/signIn')
})

router.get('/list',auth, admin.list );
router.get('/detail',auth, admin.detail );
router.post('/detail', auth, admin.updateiInfor)

router.get('/forgotPassword', admin.forgotPassword)
router.get('/changePassword',auth, admin.changePassword)
router.post('/changePassword', auth, admin.changePasswordPost)

router.get('/verify-email', admin.verifyEmail)

router.get('/signIn', admin.signIn);
// router.post('/signIn', admin.signInPost);
router.post('/signIn',
passport.authenticate('local',{
    failureRedirect: '/admin/signIn?wrongPassword',
    successRedirect: '/',
    // failureFlash: true
}))

module.exports = router;