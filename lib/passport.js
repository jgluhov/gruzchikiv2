var passport = require('passport'),
    localStrategy = require('passport-local').Strategy;

var User = require('../model/user');

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local', new localStrategy({        
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form        
        // find a user whose name is the same as the forms name
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'username' :  username }, function(err, user) {
            // if there are any errors, return the error before anything else            
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('signinMessage', 'Incorrect username.'));

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false,  req.flash('signinMessage', 'Incorrect password.'));

            // all is well, return successful user
            return done(null, user);
        });

    }));

module.exports = passport;