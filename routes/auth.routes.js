const express = require('express');

const {isAuthenticated} = require('../middleware/jwt.middleware');

const { signupController, loginController } = require('../controllers/auth.controllers');

const bcrypt = require('bcryptjs') //added

const User = require('../models/User.model') //added

const router = express.Router();

const saltRounds = 10; //added

// router.post('/signup', signupController); //original


router.post("/signup", (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: "please fill out all fields" });
    }
  
    User.findOne({ email: req.body.email })
      .then((foundUser) => {
        if (foundUser) {
          return res.status(400).json({ message: "This email address has already registered." });
        } else {
          const salt = bcrypt.genSaltSync(saltRounds);
          const hashedPass = bcrypt.hashSync(req.body.password, salt);
  
          User.create({
            name: req.body.name,
            password: hashedPass,
            email: req.body.email
          })
            .then((createdUser) => {
  
              res.json(createdUser);
            })
            .catch((err) => {
              res.status(400).json(err.message);
            });
        }
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  });


router.post('/login', loginController);

router.get('/verify', isAuthenticated, (req, res, next) => {
    console.log(req.payload);
    res.status(200).json(req.payload);
})

module.exports = router;