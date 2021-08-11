//IMPORTS
const Response = require('../helpers/response');
const jwt = require('jsonwebtoken');
const Token = require('../models/token');

//Check AUTH MIDDLEWARE
exports.auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if (token) {
        const check_token = await Token.findOne({ access_token: token});
        if(check_token) {
            await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return Response.forbidden(res,{ message: err.message });
                } else {
                    req.auth = user;
                    next();
                    return;
                }
            });
        } else {
            Response.unauthorized(res, { message : 'Unauthorized'});
        }
    } else {
        Response.unauthorized(res,{ message: 'Unauthorized' });
    }
};