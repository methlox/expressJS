// console.log("hello")

const { request } = require('express');
const express = require('express');  // imports express library
const cookieParser = require('cookie-parser');

const groceriesRoute = require('./routes/groceries');
const supermarketsRoute = require('./routes/market');

const app = express(); // creates an instance application of express

const PORT = 3001; // we need to set up a port to start listening to requests coming in

app.use(express.json()); // middleware
app.use(express.urlencoded({extended: true}));

app.use(cookieParser()); // cookie parser is a middleware so we need to call it

app.use((req, res, next) => {
    // console.log(req.url);
    console.log(`${req.method}:${req.url}`);
    next();
});

app.use('/api/groceries', groceriesRoute);
app.use('/api/markets', supermarketsRoute)

app.listen(PORT, () => console.log(`express server running on PORT ${PORT}`));