const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy

const {dbs} = require('../dbs')

passport.use(new LocalStrategy(
  function(username, password, done) {
      console.log("check");

      dbs.production.collection('admin').findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!validPassword(user, password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
  }
));

function validPassword(user, password){
    return user.password == password;
}





passport.serializeUser(function(user, done) {
    done(null, {username: user.username, name: user.name});
  });
  
  passport.deserializeUser(function(user, done) {
    // dbs.production.collection('admin').findOne({ _id: id }, function(err, user) {
    //   done(err, user);
    // });
    return done(null, user)
  });


module.exports = passport;
