const User = require('../models/user')
const jwt = require('jsonwebtoken');// to generate sign in token
const expressJwt =require('express-jwt');//to authorize
const {errorHandler} = require('../helpers/dbErrorHandler')
exports.signup = (req,res)=>{
    console.log('req.body', req.body)
    const user = new User(req.body)
    user.save((error, user)=>{
        if(error){
            return res.status(400).json({error: errorHandler(error)})
        }
        user.salt = undefined
        user.hashed_password= undefined
        res.json({user})

    })
}

exports.signin = (req,res)=>{
    console.log('req.body', req.body)
    const user = new User(req.body)
    user.save((error, user)=>{
        if(error){
            return res.status(400).json({error: errorHandler(error)})
        }
        user.salt = undefined
        user.hashed_password= undefined
        res.json({user})

    })
}

//sign in
exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

//signout
exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
};

//Require sign In 
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
    userProperty: 'auth'
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        });
    }
    next();
};
