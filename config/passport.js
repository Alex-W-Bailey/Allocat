var passport = require('passport');
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(new LocalStrategy(
  { usernameField: "email" }, function (email, password, done) {
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function (dbUser) {
      if (!dbUser) {
        return done(null, false, {
          message: "YOU DONE GOOFED!"
        });
      } else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "YOU DONE GOOFED! EVEN MORE(INCORRECT PASSWORD)"
        });
      }
      return done(null, dbUser);
    });
  }
));

passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(user, callback) {
  callback(null, user);
});

module.exports = passport;