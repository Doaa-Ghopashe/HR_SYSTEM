const express = require('express'),

  bcrypt = require('bcrypt'),

  jwt = require('jsonwebtoken'),

  User = require("../models/user"),

  router = express.Router();

// Login
router.post('/login', async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
      return res.status(400).send('Both email and password are required');
    }

    // Find the user in the database
    const user = await User.findOne({ email });

    if (user) {
      // Compare the entered password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Create a token
        const token = jwt.sign(
          { user_id: user._id, email: user },
          process.env.TOKEN_KEY,
          { expiresIn: '2h' }
        );
        // Save the token to the user document
        user.token = token;

        // Return the user with the token
        return res.status(200).json(user);
      }
    }

    // Invalid credentials
    return res.status(400).send('Invalid credentials');
  } catch (err) {
    return res.status(500).send('Internal Server Error');
  }
});

//logout
router.all("/logout", (req, res) => {
  // req.session.destroy();
  localStorage.removeItem('token');
  // jwt.destroy(token)
  // res.redirect('/login');
});



module.exports = router;
