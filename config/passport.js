var LocalStrategy = require('passport-local').Strategy;
var { selectQuery, insertQuery } = require('../models/query');
var bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = (passport) => {


    passport.serializeUser((user, done) => {
        done(null, user.Email);
    })

    passport.deserializeUser(async (Email, done) => {
        let q = `SELECT * FROM Student WHERE Email = '${ Email }'`;
        let result = await selectQuery(q);
        let err = null;
        if(result.length == 0) {
            err = {
                message: "No Student Registered with the Email"
            }
        }
        done(err, result[0]);
    })

    // Sign Up
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'Email',
        passwordField: 'Password',
        passReqToCallback: true
    },
    async (req, Email, Password, done) => {
        let q1 = `SELECT * FROM Student WHERE Email = '${ Email }'`;
        let result1 = await selectQuery(q1);
        let q2 = `SELECT * FROM Student WHERE RollNumber = '${ req.body.RollNumber }'`;
        let result2 = await selectQuery(q2);
        if(result2.length > 0) {
            let message = "Account with already exists for the given Roll Number";
            return done(null, false, req.flash('signup', message));
        }
        else if (result1.length > 0) {
            let message = "Account with already exists for the given Email Id";
            return done(null, false, req.flash('signup', message));
        }
        else {
            bcrypt.hash(Password, saltRounds)
                .then(async (hash) => {
                    var { RollNumber, Name, Rank, Marks } = req.body;
                    var data = {
                        RollNumber,
                        Email: Email,
                        Name,
                        Rank,
                        Marks,
                        Password: hash
                    }

                    q = 'INSERT INTO Student SET ?';
                    insertQuery(q, data)
                        .then((result) => {
                            return done(null, data);
                        })
                        .catch((err) => {
                            let message = "Invalid Form Data";
                            return done(null, false, req.flash('signup', message));
                        })
                })
        }

    }
    ))

    // Login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'Email',
        passwordField: 'Password',
        passReqToCallback: true
    },
    async (req, Email, Password, done) => {
        let q = `SELECT * FROM Student WHERE Email = '${ Email }'`;
        let result = await selectQuery(q);

        if(result.length == 0) {
            let message = "Email Id does not Exist";
            return done(null, false, req.flash('login', message));
        }
        else {
            bcrypt.compare(Password, result[0].Password)
                .then((res) => {
                    if(!res) {
                        let message = "Wrong Password";
                        return done(null, false, req.flash('login', message));
                    }
                    else {
                        return done(null, result[0]);
                    }
                })

        }
    }
    ))

}
