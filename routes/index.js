var express = require('express');
var router = express.Router();
var passport = require('passport');
var { getProgramByRollNumber, getInstitute, getProgramsChosen, getPrograms } = require('../helpers/data');
var Matcher = require('../helpers/MatchMaker');
var axios = require('axios');
var request = require('request');


const isLoggedIn = (req) =>{
    if(req.user) {
        return true;
    }
    return false;

}

/* GET home page. */
router.get('/', async function(req, res, next) {
    if(!isLoggedIn(req))
        res.render('../views/index', { title: "Home" , loggedIn: false});
    else{
        let programs = await getProgramByRollNumber(req.user.RollNumber);
        res.render('../views/indexSignedIn', { title: "Home", programs , loggedIn: true});
    }
});

// Sign up
router.get('/signup', (req, res, next) => {
    res.render('../views/forms/signup', {title: "Sign Up", message: req.flash('signup'), loggedIn: isLoggedIn(req)});
})
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
}))

// Login
router.get('/login', (req, res, next) => {
    if(isLoggedIn(req)) {
        res.redirect('/');
    }
    else {
        res.render('../views/forms/login', {title: "Student Login", message: req.flash('login'), loggedIn: isLoggedIn(req)});
    }
})
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

// Register For a Program
router.get('/register', async (req,res) => {
    let institutes = await getInstitute();
    res.render('registration', { title: "Registration", StudentRollNumber: req.user.RollNumber, institutes , loggedIn: isLoggedIn(req), message: req.flash('error')});
});

// Logout
router.get('/logout', async (req, res) => {
    if(isLoggedIn(req)) {
        req.logout();
    }
    res.redirect('/');
})

router.post('/register', (req,res) => {
    axios.post(`http://localhost:3000/ProgramChosen`, req.body)
            .then(response => {
                res.redirect('/');
            })
            .catch(err => {
                req.flash('error', 'Invalid Input');
                res.redirect('back');
            })
});

// Result of the selection procedure.

const updatePrograms = programs => {
    programs.forEach(program => {

            let url = 'http://localhost:3000/institute/' + program.InstituteId + '/program/' + program.Name;
            let options = {
                method: 'PUT',
                url: url,
                form: program
            }
            request.put(options, (err, res, data) => {
                if(err) {
                    console.log(err);
                }
                else if (res.statusCode !== 200) {
                    console.log(res.statusCode);
                }
            })
    })
}

router.get('/result', async (req, res) => {
    let students = [];
    let temp = await getProgramsChosen();
    let programs = await getPrograms();
    await temp.forEach(async student => {
        let t = await students.filter(e => e.StudentRollNumber === student.StudentRollNumber);
        if(t.length > 0){
            console.log(t,student);
            student.programs.push({
                ProgramName: student.ProgramName,
                InstituteId: student.InstituteId,
            })
        } else {
            student.programs = [{
                ProgramName: student.ProgramName,
                InstituteId: student.InstituteId,
            }];
            students.push(student);
        }
    });
    const func = new Matcher(students, programs);
    const result = await func.match;
    const progs = await func.programs;

    updatePrograms(progs);


    res.render('result', { title: 'Result', result, loggedIn: isLoggedIn(req) });
});

module.exports = router;
