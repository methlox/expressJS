const { Router } = require('express');

const router = Router();

const supermarkets = [
  {
    id: 1,
    store: 'Whole Foods',
    km: 3
  },
  {
    id: 2,
    store: 'Trader Joes',
    km: 4.3
  },
  {
    id: 3,
    store: 'Albertsons',
    km: 2.3
  },
  {
    id: 4,
    store: 'Trader Joes',
    km: 3
  },
  {
    id: 5,
    store: 'Albertsons',
    km: 1.3
  },
];

router.get('', (req, res) => {
    // console.log(req.query);
    const { km } = req.query;
    const parsedKM = parseInt(km);
    if (!isNaN(parsedKM)) {
         
        const filteredStores = supermarkets.filter((s) => s.km <= parsedKM);
        res.send(filteredStores);

    } else {
        res.send(supermarkets);
    }

    // res.send(supermarkets);
});

module.exports = router;