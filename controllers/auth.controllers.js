const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const signupController = (req, res, next) => {
    // res.send('signup route works');

    //destructuring
    const {email, password, name} = req.body 

    //guard statement
    if(!name || !email || !password){
        return res.status(400).json({
            error: {
                message: `Something's missing. Please fill out each required field before submitting.`
            }
        })
    }

    //password security
    bcryptjs.hash(password, 10)
        .then(hashedPassword => {
            res.send(hashedPassword);
            return User.create({
                name,
                email,
                password: hashedPassword
            })
        })
        .then(createdUser => {
            res.json(createdUser)
        })
        .catch(err => res.send(err));
};

const loginController = (req, res, next) => {
    // res.send('login route works');

    //destructuring
    const {email, password} = req.body;

    //guard statement
    if(!email || !password){
        return res.json({
            error: {
                message: 'Missing email or password. Please fill out each field before continuing.'
            }
        })
    }
        //testing whether guard statement works in postman
        //res.send(req.body);

    let myUser;

    //checking if user exists when attempting to log in
    User.findOne({email: email})
        .then(foundUser => {
            // res.json(foundUser);

            if(!foundUser){
                return Promise.reject('Invalid email or password.')
            }
            myUser = foundUser;
            return bcryptjs.compare(password, foundUser.password)
        })
        .then(isValidPassword => {
            // res.send(isValidPassword)
            if(!isValidPassword){
                return Promise.reject('Invalid email or password.')
            }
            //issuing token
            const payload = {
                _id: myUser._id,
                name: myUser.name,
                email: myUser.email
            };
            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                {
                    algorithm: 'HS256',
                    expiresIn: '120h'
                }
            );
            res.json({
                authToken: authToken
            });
        })
        .catch(err => res.send(err))
};

module.exports = { 
    signupController,
    loginController
};