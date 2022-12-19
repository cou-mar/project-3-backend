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
};

const loginController = (req, res, next) => {
    // res.send('login route works');
}

module.exports = { 
    signupController,
    loginController
};