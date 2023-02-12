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


// AUTH MIDDLEWARE
router.use((req, res, next) => {
    if(req.session.user) next();
    else res.sendStatus(401);
});

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

// CART
router.get('/shopping/cart', (req, res) => {
    const { cart } = req.session;
    if(!cart){
        res.send('you got no cart homie!');
    } else{
        res.send(cart);
    }
});

router.post('/shopping/cart/item', (req, res) => {
    const { item, quantity } = req.body;
    const cartItem = { item, quantity };
    // console.log(cartItem);
    // res.send(req.sessionID);
    const { cart } = req.session;
    if (cart) {
        req.session.cart.items.push(cartItem);
    } else {
        req.session.cart = {
            items: [ cartItem ],
        }
    }

    res.sendStatus(201);
});

// POST REQ
router.post('/', (req, res) => {
    console.log(req.body);
    groceryList.push(req.body);
    res.sendStatus(201);
});

module.exports = router;