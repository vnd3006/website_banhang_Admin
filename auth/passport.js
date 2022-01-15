const bcrypt = require('bcrypt');

const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy

const {dbs} = require('../dbs')

passport.use(new LocalStrategy(
  function(username, password, done) {

      dbs.production.collection('admin').findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!validPassword(user, password)) {
          console.log(password);
          console.log("check pass");
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
  }
));

function validPassword(user, password){

  return bcrypt.compareSync(password, user.password);
}



passport.serializeUser(function(user, done) {

    done(null, {username: user.username, name: user.name, email: user.email, id: user._id});
    
    
  });
  
passport.deserializeUser(function(user, done) {
  return done(null, user)
});


module.exports = passport;
