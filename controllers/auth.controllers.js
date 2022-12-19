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
}

module.exports = { 
    signupController,
    loginController
};