// console.log("hello")

const express = require('express');  // imports express library

const app = express(); // creates an instance application of express

const PORT = 3001; // we need to set up a port to start listening to requests coming in

app.listen(PORT, () => console.log(`express server running on PORT ${PORT}`));

app.get('/groceries', (req, res) => {
    res.send([
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


    ])
});