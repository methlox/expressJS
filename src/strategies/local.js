const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../database/schemas/User');
const { comparePassword } = require('../utils/helpers');

passport.use(
    new Strategy({
        usernameField: 'email', // if we dont do this email will insted be picked up as username. we need to change it
    }, 
    async (email, password, done) => {
        console.log(email);
        console.log(password);
        try {
            if (!email || !password) throw new Error('Missing Credentials');
            const userDB = await User.findOne({ email });
            if (!userDB) throw new Error('User not found');
            const isValid = comparePassword(password, userDB.password);
            if (isValid) {
                console.log('Authentication successful');
                done(null, userDB);
            } else {
                console.log('Invalid Authentication');
                done(null, null);
            }
        } catch(err) {
            console.log(err);
            done(err, null);
        }
    })
)