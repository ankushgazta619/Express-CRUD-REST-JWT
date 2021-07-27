const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Response = require('./helpers/response');

//CONFIGURE .ENV FILE
require('dotenv').config();

//CONNECT TO DATABASE
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true });

//DATABASE CONNECTION VARIABLE
const db = mongoose.connection;

//VERIFY DATABASE CONNECTION
db.on('error', () => {
    console.log('DATABASE CONNECTION ERROR');
});
db.once('open', () => {
    console.log('DATABASE CONNECTED');
});

//SET PORT TO USE
const PORT = process.env.PORT || 3132;

//CREATE SERVER
app.listen(PORT, () => {
    console.log(`Backend server started on port: http://127.0.0.1:${PORT}`)
});



//TELL EXPRESS TO USE JSON WHILE GETTING REQUEST FROM CLIENT
app.use(express.json());


//INDEX ROUTES
app.use('/',require('./routes/home'));

//USER ROUTES
app.use('/user',require('./routes/user'));

//AUTH ROUTES
app.use('/auth',require('./routes/auth'));
