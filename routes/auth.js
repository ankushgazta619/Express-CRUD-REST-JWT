const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');

//LOGIN
router.post('/login',AuthController.login);

//REGISTER
router.post('/register',AuthController.register);

module.exports = router;

