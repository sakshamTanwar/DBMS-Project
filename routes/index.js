var express = require('express');
var router = express.Router();
var passport = require('passport');
var { getProgramByRollNumber, getInstitute } = require('../helpers/data');


/* GET home page. */
router.get('/', async function(req, res, next) {
    if(!req.user)
        res.render('../views/index', { title: "Home" });
    else{
        let programs = await getProgramByRollNumber(req.user.RollNumber);
        res.render('../views/indexSignedIn', { title: "Home", programs });
    }
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

// Register For a Program
router.get('/register', (req,res) => {
    let institutes = await getInstitute();
    res.render('/registration', { title: "Registration", StudentRollNumber: req.user.rollNumber, institutes });
});

router.post('/registration', (req,res) => {
    axios.post(`http://localhost::3000/institute/${req.body.InstituteId}/program`, req.body)
            .then(res => {
                res.redirect('/');
            })
});

module.exports = router;
