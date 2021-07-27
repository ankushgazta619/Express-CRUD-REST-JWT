//IMPORTS
const Response = require('../helpers/response');
const jwt = require('jsonwebtoken');

//Check AUTH MIDDLEWARE
exports.auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return Response.forbidden(res,{ message: err.message });
            }
            req.auth = user;
            next();
            return;
        });
    } else {
        Response.unauthorized(res,{ message: 'Unauthorized' });
    }
};