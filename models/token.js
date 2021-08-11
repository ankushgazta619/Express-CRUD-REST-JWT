const mongoose = require('mongoose');

//DEFINE SCHEMA
const tokenSchema = mongoose.Schema({
    user_id : { type : String, required : true },
    access_token: { type : String, required : true },
    refresh_token: { type: String, required : true }
});

//EXPORT MODEL
 module.exports = mongoose.model('Token',tokenSchema);