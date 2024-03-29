const { Router } = require('express');
const User = require('../database/schemas/User');
const { hashPassword, comparePassword } = require('../utils/helpers.js');
const passport = require('passport');
const router = Router();
const { authRegisterController } = require('../controllers/auth');


// router.post('/login', (request, response) => {
//   const { username, password } = request.body;
//   if (username && password) {
//     if (request.session.user) {
//       response.send(request.session.user);
//     } else {
//       request.session.user = {
//         username,
//       };
//       response.send(request.session);
//     }
//   } else response.send(401);
// });

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   if(!email || !password) return res.sendStatus(400);
//   const userDB = await User.findOne({ email });
//   if(!userDB) return res.send(401);
//   const isValid = comparePassword(password, userDB.password);
  // if (isValid) {
  //   console.log('Authentication successful');
  //   return res.sendStatus(200);
  //   req.session.user = userDB; // MODIFYING SESSION OR ATTACHING A COOKIE YOU KNOW HOW WE ROLL
  // } else { 
  //   console.log('Authentication failed');
  //   return res.sendStatus(401);
  // }

// })

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('Logged In!');
  res.sendStatus(200); 
});

router.post('/register', authRegisterController);

router.get('/discord', passport.authenticate('discord'), (req, res) => {
  res.sendStatus(200);
});


router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
  res.sendStatus(200);
});

module.exports = router;