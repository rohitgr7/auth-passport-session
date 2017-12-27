const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

const localOptions = { usernameField :'email' };

const localAuth = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email })
    .then(user => {
      if (!user) {
        done(null, false);
      } else {
        return user.checkPassword(password)
          .then(() => {
            done(null, user);
          });
      }
    }).catch(e => {
      done(null, false);
    });
});

passport.use(localAuth);
