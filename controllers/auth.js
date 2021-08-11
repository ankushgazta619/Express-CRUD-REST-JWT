//IMPORTS
const User = require('../models/user');
const Token = require('../models/token');
const bcrypt = require('bcrypt');
const Auth = require('../helpers/auth');
const Response = require('../helpers/response');
const Str = require("randomstring");

//LOGIN
exports.login = async (req,res) => {
    try {
        let user = await Auth.authenticate(req.body);
        if(user) {
            let data = {
                access_token : await Auth.generateAccessToken(user),
                refresh_token : await Auth.generateRefreshToken(user),
                user : user
            };

            if( !await Auth.storeToken(user._id,data) )
            return Response.error(res, { message: 'Failed to store token' });
            return Response.success(res,{ message:'Authorised', data: data });
        }
        return Response.unauthorized(res,{ message: 'Invalid Credentials' });
        
    } catch (error) {
        Response.error(res,{ message: error.message });
    }
}

//REGISTER
exports.register = async function(req, res) {
    try {
        let user = new User({
            name:req.body.name,
            email:req.body.email,
            username : req.username ? req.username : Str.generate(15),
            password: await bcrypt.hash(req.body.password, 10),
            age:req.body.age,
            mobile:req.body.mobile,
            active:req.body.active || true
        });
        let saved_user = await user.save();
        let data = {
            user: saved_user,
            access_token : await Auth.generateAccessToken(saved_user),
            refresh_token : await Auth.generateRefreshToken(saved_user)
        };

        if( !await Auth.storeToken(saved_user._id,data) )
        return Response.error(res,{ message: 'Failed to store token' });
        return Response.success(res,{ status: 201, data: data });
    } catch (error) {
        return Response.badRequest(res,{ message: error.message });
    }
}

//GENERATE NEW TOKEN FROM REFRESH TOKEN
exports.token = async function(req, res) {
    try {
        const authHeader = req.headers.authorization;
        if ( !authHeader ) {
            return Response.unauthorized(res,{ message: 'Please provide refresh token in Authorization Header' });
        }
        const token = authHeader.split(' ')[1];
        const check_token = await Token.findOne({ refresh_token: token });
    
        if( !check_token ) {
            return Response.forbidden(res, { message: 'Invalid refresh token' });
        }

        if( !await Auth.verifyRefreshToken(token) ) {
            return Response.unauthorized(res,{ message: 'Invalid refresh token'});
        }
        
        const user = await User.findById(check_token.user_id);

        let data = {
            access_token : await Auth.generateAccessToken(user),
            refresh_token : await Auth.generateRefreshToken(user)
        };

        if( !await Auth.storeToken(user._id,data) )
        return Response.error(res,{ message: 'Failed to store token' });
        return Response.success(res,{ data: data });
    } catch (error) {
        return Response.badRequest(res, { message: error.message });    
    }
}