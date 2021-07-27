const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UserController = require('../controllers/user');
const Response = require('../helpers/response');
const AuthMiddleware = require('../middlewares/middlewares');

//GET ALL
router.get('/', AuthMiddleware.auth ,UserController.index);

//GET ONE
router.get('/:id', AuthMiddleware.auth ,getUser , UserController.user);

//STORE
router.post('/', AuthMiddleware.auth ,UserController.store);

//PUT 
router.put('/:id', AuthMiddleware.auth ,getUser , UserController.put);

//PATCH
router.patch('/:id', AuthMiddleware.auth ,getUser , UserController.patch);

//DELETE
router.delete('/:id', AuthMiddleware.auth ,getUser , UserController.delete);

//GET THE USER OF PARTICULAR ID FROM DATABASE
async function getUser(req,res,next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if(user === null) {
            return Response.badRequest(res,{ status: 404, message: 'User not found'});
        }
    } catch (error) {
        return Response.error(res,{ message: error.message});
    }
    res.user = user;
    next();
}

module.exports = router;