const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//...
//....
const auth = require("../Middleware/auth");
const admin=require('../Middleware/admin');
const userController = require('../controllers/userController')
const User = require("../models/user");
const router=express.Router();

router.post('/user' , userController.add )
router.get('/user' , userController.list )
router.get('/user/:id' , userController.getById )
router.delete('/user/:id' , userController.remove )
router.put('/user/:id' , userController.edit )

// user profile
// router.get('/profile/:id',auth,async (req, res, next)=>{
//   const profile = await User.findById(req.user._id).select("-password")
//   if (!profile) {
//           return res.status(404).json({ msg: 'profile not found' });
//         }
//         res.json(profile);
//   res.send(profile);
// });


// Register
router.post("/register",async (req, res) => {
    
  try {
    // Get user input
    const { firstName, lastName,age, email, password } = req.body;

    // Validate user input
    if (!(email && password && firstName && lastName)) {
     return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const isAdmin = req.body.isAdmin || false;
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(), 
      password: encryptedPassword,
      isAdmin:isAdmin,
    });

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  
    });


    
    // Login
 router.post("/login", async(req, res) => {
  
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
     return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email,isAdmin:user.isAdmin },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    else{
      res.status(400).send("Invalid Credentials");
    }
    
  } catch (err) {
    console.log(err);
  }
    });


    router.post("/welcome", auth, (req, res) => {
        res.status(200).send("Welcome");
        
      });


      //logout
// router.all("/logout", (req, res)=>{
//   // req.session.destroy();
//   jwt.destroy(token)
//   res.redirect('/user');
// });



module.exports = router;
