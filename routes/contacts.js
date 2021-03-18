//Just CRUD functionality, read update etc
//Will have 4 routes - Create read update delete

const express = require('express');
const router = express.Router();


//@route  GET  api/contacts
//@desc   Get all user's contacts
//@access Private
router.get('/', (req, res) => {

    res.send('Get all contacts');
});



//@route  POST  api/contacts
//@desc   Add new contact
//@access Private
router.post('/', (req, res) => {

    res.send('Add contact');
});


//placeholder for what we wanna update /:id

//@route  PUT  api/contacts/:id
//@desc   Update contact
//@access Private
router.put('/:id', (req, res) => {

    res.send('Update contact');
});


//@route  DELETE  api/contacts/:id
//@desc   delete contact
//@access Private
router.delete('/:id', (req, res) => {

    res.send('Delete contact');
});



//have to write this otherwise it wont work
module.exports=router;