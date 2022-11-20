const LocalStrategy = require('passport-local').Strategy
const Register = require('../models/registerSchema')
const bcrypt = require("bcrypt")
require('express-session')
function init(passport){
    passport.use(new LocalStrategy({usernameField:'email'},async(email, password,done)=>{
        const user = await Register.findOne({email:email})
        if (!user) { 
            return done(null, false, {message: 'No user with this mail'}); 
        }
        bcrypt.compare(password, user.password).then(match=>{
            if(match){
                return done(null,user, {message: 'Login Succesfully'})
            }
            return done(null, false, {message: 'Wrong Username or password'})

        }).catch(err =>{
            return done(null, false, {message: 'Somethin went wrong'})
        })
        


    }))
    passport.serializeUser((user, done)=>{
        done(null, user.id);
    })

    passport.deserializeUser((id, done)=>{
        Register.findById(id,(err,user)=>{
            done(err,user)
        })
    })



}

module.exports = init;