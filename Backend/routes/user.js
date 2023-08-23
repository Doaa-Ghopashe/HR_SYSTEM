const express = require('express'),

  bcrypt = require('bcrypt'),

  jwt = require('jsonwebtoken'),

  User = require("../models/user"),

  router = express.Router();


// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Both email and password are required');
    }

    const user = await User.findOne({ email });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {

        const token = jwt.sign(
          { user_id: user._id, email: user.email },
          process.env.TOKEN_KEY,
          { expiresIn: '2h' }
        );

        user.token = token;

        return res.status(200).json(user);
      }
    }

    // Invalid credentials
    return res.status(400).send('Invalid credentials');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
});


// logout
router.all('/logout', (req, res) => {

  localStorage.removeItem('token');

  res.redirect('/login');
});



module.exports = router;
