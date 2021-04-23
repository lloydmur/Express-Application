const LocalStrategy = require('passport-local').Strategy
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

/*Oath providers like google can grant permission
to gain access to profile info.
once permission is granted, get code from provider in redirect URI,
(Uniform resource identifier)
exchange code for profile info
fire passport callback function
After logging in the user can be accessed with req.user
*/
//done(err, id) passes info to next stage(whatever that is)

//takes info and passes to cookie
passport.serializeUser((user, done) => {
    return done(null, user._id);
})
//takes info from cookie
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        return done(null, user);
    })
})

passport.use(
    //Option for google strat
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    },
    //callback function
    (token, tokenSecret, profile, done) => {
        //check for existing user
        User.findOne({googleId: profile.id})
            .then((user) => {
                if(user)
                {
                    //user exists
                    console.log('Existing user found:' + user.userName);
                    return done(null, user);
                }
                else
                {
                    //create new user
                    var admin = (profile.id == keys.administrator.id)? true : false;
                    const nUser = new User({

                        userName: profile.displayName,
                        googleId: profile.id,
                        isAdmin: admin
                        
                    });
                    nUser.save()
                        .then((result) => {
                            console.log('New User Created' + result);
                        })
                    return done(null, nUser);
                }
            });
    })

)//passport.use end
passport.use(
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        User.findOne({userName: username}, (err, user) => {
            if(err) return done(err);
            if(!user) return done(null, false, {message: 'Invalid Login Credentials'});
            if(!verifyPassword(password, user.password)) return done(null, false, {message: 'Invalid Login Credentials'});
            console.log('User found: ' + username);
            return done(null, user);
        })
        /*
            .then((result) => {
                if(!result){
                    console.log('No user found');
                    return done(null, false, {message: 'Incorrect Credentials'});
                }
                else{
                    console.log('User found: ' + username)
                    
                    return done(null, result);
                }
                
            })
            */
    }
    )
)
async function verifyPassword(password, hashWord){
    const match = await bcrypt.compare(password, hashWord);
    return match;
}