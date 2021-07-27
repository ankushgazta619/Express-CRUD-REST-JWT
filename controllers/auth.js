//IMPORTS
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Auth = require('../helpers/auth');
const UserController = require('../controllers/user');
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
                user : user,
            };
            await Auth.storeToken(data.user,data);
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
        Auth.storeToken(user,data);
        return Response.success(res,{ status: 201, data: data });
    } catch (error) {
        return Response.badRequest(res,{ message: error.message });
    }
}