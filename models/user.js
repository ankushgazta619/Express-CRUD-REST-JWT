const mongoose = require('mongoose');

//DEFINE SCHEMA
const userSchema = mongoose.Schema({
    name : { type : String, required : true },
    email : { type : String, unique : true , required : true, },
    password : { type: String , required : true, minlength : 6 },
    age : { type : Number, min: 0 },
    mobile : { type : String, maxlength: 30 },
    active : { type : Boolean, default : 1 },
    access_token: { type : String, default : null },
    refresh_token: { type: String, default : null }
});

//EXPORT MODEL
 module.exports = mongoose.model('User',userSchema);
