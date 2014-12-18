var express = require('express'),
    router = express.Router(),
    passport = require('../lib/passport');

var User = require('../model/user');

/* GET home page. */
router.route('/')
    .get(function(req, res) {
        res.render('index', { title: 'Home page', subtitle: 'Грузчики в Нижнем Новгороде', user: req.user });
    });

/* GET login page. */
router.route('/login')
    .get(function(req, res) {
        res.render('auth/login', { title: 'Login page', message: req.flash('loginMessage') });
    })
    .post(passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true 
    }));
router.route('/logout')
    .get(function(req, res) {
        req.logout();
        res.redirect('/');
    })
            
module.exports = router;
