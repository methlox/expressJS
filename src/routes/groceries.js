const { Router } = require('express');
const router = Router();

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
router.get('/', (req, res) => {

    // COOKIE
    res.cookie('visited', true, {
        maxAge: 10000, // 10k milisec=10 sec
    });


    res.send(groceryList);
});

// ROUTE PARAMS
router.get('/:item', (req, res) => {
    // console.log(req.params.item);
    const {item} = req.params;
    const groceryItem = groceryList.find((g) => g.item === item);
    console.log(req.cookies);
    res.send(groceryItem);
});

// POST REQ
router.post('/', (req, res) => {
    console.log(req.body);
    groceryList.push(req.body);
    res.sendStatus(201);
});

module.exports = router;