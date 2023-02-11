// console.log("hello")

const { request } = require('express');
const express = require('express');  // imports express library

const app = express(); // creates an instance application of express

const PORT = 3001; // we need to set up a port to start listening to requests coming in

app.use(express.json()); // middleware
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
    // console.log(req.url);
    console.log(`${req.method}:${req.url}`);
    next();
});

app.listen(PORT, () => console.log(`express server running on PORT ${PORT}`));

const groceryList = [
    {
        item: "milk",
        quantity: 2
    },
    {
        item: "apples",
        quantity: 4
    },
    {
        item: "pop-tarts",
        quantity: 4
    },
];

// GET REQ
app.get('/groceries', (req, res) => {
    res.send(groceryList);
});

// POST REQ
app.post('/groceries', (req, res) => {
    console.log(req.body);
    groceryList.push(req.body);
    res.sendStatus(201);
})