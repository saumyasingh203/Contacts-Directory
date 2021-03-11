//register route

const express = require('express');
const router = express.Router();


//we are registering ther user here so we use a post request to submit their details

//@route  POST  api/users
//@desc   Register a user
//@access Public
router.post('/', (req, res) => {

    res.send('Register a User');
});


//have to write this otherwise it wont work
module.exports=router;