//register route

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//for jwtSecret
const config = require("config");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");

//we are registering ther user here so we use a post request to submit their details

//@route  POST  api/users
//@desc   Register a user
//@access Public

//to validate the data we are sending
router.post(
  "/",
  [
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //if user already exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      //if user does not exist, then create a new user
      //same as doing name: name, email: email, password: password
      user = new User({
        name,
        email,
        password,
      });

      //we have to encrypt password before saving to database
      //gensalt generates salt and returns a promise, hash returns promise
      //10 is the standard value and determines how strong the password is
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // res.send("user saved");

      //creating a payload: object we wanna send instead of saying "saved"
      const payload = {
        user: {
          //we can access everthing using this ID
          id: user.id,
        },
      };

      //after options we have a callback
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//have to write this otherwise it wont work
module.exports = router;
