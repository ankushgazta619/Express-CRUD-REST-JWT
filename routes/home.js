var express = require('express');
var router = express.Router();

//INDEX
router.get('/',(req,res,next) => {
    res.status(200).json('HOME PAGE');
});

module.exports = router;