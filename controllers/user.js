//REQUIRED FILES
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Str = require("randomstring");
const Response = require('../helpers/response');

//INDEX
exports.index = async (req,res) => {
    try {
        const users = await User.find();
        return Response.success(res,{ data: users });
    } catch (error) {
        return Response.error(res,{ message: error.message });
    }   
}

//GET ONE
exports.user = (req,res) => {
    return Response.success(res,{ data: res.user }); 
}

//Store
exports.store = async (req,res) => {
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
        await user.save();
        return Response.success(res,{ status: 201, data: user });
    } catch (error) {
        return Response.badRequest(res,{ message: error.message });
    }  
}

//PUT
exports.put = async (req,res) => {
    res.user.name = req.body.name;
    res.user.email = req.body.email;
    res.user.username = req.body.username;
    res.user.age = req.body.age;
    res.user.mobile = req.body.mobile;
    res.user.active = req.body.active;
    try {
        const updated_user = await res.user.save();
        return Response.success(res,{ data:updated_user });
    } catch (error) {
        return Response.badRequest(res,{ message: error.message });
    }
}

//PATCH
exports.patch = async (req,res) => {
    try {
        Object.entries(req.body).forEach(request => {
            res.user[request[0]] = request[1];
        });
        const updated_user = await res.user.save();
        return Response.success(res,{ data: updated_user });
    } catch (error) {
        return Response.badRequest(res,{ message: error.message });
    }
}

//DELETE
exports.delete = async (req,res,next) => {
    try {
        await res.user.remove();
        return Response.success(res,{ message: 'Deleted Successfully' });
    } catch (error) {
        return Response.error(res,{ message: error.message });
    }
}