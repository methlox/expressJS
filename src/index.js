// console.log("hello")

// const { request } = require('express');
const express = require('express');  // imports express library
// const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const groceriesRoute = require('./routes/groceries');
const supermarketsRoute = require('./routes/market');
const authRoute = require('./routes/auth');

const app = express(); // creates an instance application of express

const PORT = 3001; // we need to set up a port to start listening to requests coming in

require('./database');

// mongoose.set('strictQuery', false);
// // MONGODB
// mongoose
//   .connect('mongodb://localhost:27017/expressjs')
//   .then(() => console.log('Connected to DB'))
//   .catch((err) => console.log(err));

app.use(express.json()); // middleware
app.use(express.urlencoded({extended: true}));

app.use(cookieParser()); // cookie parser is a middleware so we need to call it
app.use(session({
    secret: 'HSUIDJFGSJGIHEIOFGIFHFDGJKDFDFNGIFJFJIOGJ',
    resave: false,
    saveUninitialized: false,
}));

app.use((req, res, next) => {
    // console.log(req.url);
    console.log(`${req.method}:${req.url}`);
    next();
});


app.use('/api/groceries', groceriesRoute);
app.use('/api/markets', supermarketsRoute);
app.use('/api/auth', authRoute);

app.listen(PORT, () => console.log(`express server running on PORT ${PORT}`));