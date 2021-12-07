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

router.get('/signIn', admin.signIn);
// router.post('/signIn', admin.signInPost);
router.post('/signIn',
passport.authenticate('local',{
    failureRedirect: '/admin/signIn',
    successRedirect: '/'
}))

module.exports = router;