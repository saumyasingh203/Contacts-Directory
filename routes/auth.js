//register route

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//for jwtSecret
const config = require("config");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const auth = require("../middleware/auth");

//needs to be validated using middleware
//@route  GET  api/auth
//@desc   Get logged in user
//@access Private

//passing auth as a 2nd parameter
router.get("/", auth, async (req, res) => {
  try {
    //getting user from database, we use mongoose method which returns a promise
    //if we send correct token and are logged in, user.id will have current user id
    //even tho pw is encrypted, we don't want to return that
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  POST  api/auth
//@desc   Auth user and get token
//@access Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      //returns a promise too
      //user password is the hash password stored in the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      //if everything is good we are gonna get user ID
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          //time for 1 session
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
