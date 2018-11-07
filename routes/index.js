var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', async function(req, res, next) {
    console.log(req.user);
    res.send("<h1>Home Page</h1>")
});

// Sign up
router.get('/signup', (req, res, next) => {
    res.render('../views/forms/signup', {title: "Sign Up", message: req.flash('signup')});
})
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
}))

// Login
router.get('/login', (req, res, next) => {
    res.render('../views/forms/login', {title: "Student Login", message: req.flash('login')});
})
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

module.exports = router;
