const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

//CHECK IF CREDENTIALS PROVIDED BY USER IS CORRECT
exports.authenticate = async function(req) {
    let user;
    if(req.username) {
        user = await User.findOne({ username: req.username });
    } else if(req.mobile){
        user = await User.findOne({ mobile: req.mobile });
    } else if(req.email){
        user = await User.findOne({ email: req.email });
    }
    if(user) {
        if ( await bcrypt.compare(req.password, user.password)) return user;
        return false;
    } else {
        return false;
    }
}

//GENERATE ACCESS TOKEN
exports.generateAccessToken = async function(user) {
    return await jwt.sign({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        age: user.age,
        active: user.active
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
}

//GENERATE REFRESH TOKEN 
exports.generateRefreshToken = async function(user) {
    return await jwt.sign({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        age: user.age,
        active: user.active
    }, process.env.REFRESH_TOKEN_SECRET);
}


//STORE ACCESS AND REFRESH TOKEN IN DATABASE
exports.storeToken = async function(user,data) {
    user.access_token = data.access_token || null;
    user.refresh_token = data.refresh_token || null;
    await user.save();
}