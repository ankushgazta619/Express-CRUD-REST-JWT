//RESPONSE HELPERS

//SUCCESS RESPONSE
exports.success = function(res,data=false) {
    res.status(data.status || 200).send({
        'success':true,
        'message':data.message || null,
        'data':data.data || null
    });
}

//ERROR RESPONSE
exports.error = function(res,data=false) {
    res.status(data.status || 500).send({
        'success':false,
        'message':data.message || null,
        'data':data.data || null
    });
}

//UNAUTHORISED RESPONSE
exports.unauthorized = function(res,data=false) {
    res.status(data.status || 401).send({
        'success':false,
        'message':data.message || null,
        'data':data.data || null
    });
}

//FORBIDDEN RESPONSE
exports.forbidden = function(res,data=false) {
    res.status(data.status || 403).send({
        'success':false,
        'message':data.message || null,
        'data':data.data || null
    });
}

//BADREQUEST RESPONSE
exports.badRequest = function(res,data=false) {
    res.status(data.status || 400).send({
        'success':false,
        'message':data.message || null,
        'data':data.data || null
    });
}