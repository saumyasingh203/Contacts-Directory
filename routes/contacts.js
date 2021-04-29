//Just CRUD functionality, read update etc
//Will have 4 routes - Create read update delete

const express = require("express");
const router = express.Router();

//whenever we need to protect routes, we need middleware
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Contact = require("../models/Contact");

//@route  GET  api/contacts
//@desc   Get all user's contacts
//@access Private

//adding 2nd parameter as auth will make it protected
//try catch because we are dealing with mongoose

//await only valid when we mark async
router.get("/", auth, async (req, res) => {
  try {
    //since we used auth we have access to returned object user.id
    //date : -1 means recent first
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  POST  api/contacts
//@desc   Add new contact
//@access Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //we saved this in request body in middleware
    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      //make new contact and save it to database
      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//placeholder for what we wanna update /:id

//@route  PUT  api/contacts/:id
//@desc   Update contact
//@access Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    //no contact to update
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    //contact.user is not a string while req.user.id is
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
      //if contact isnt there then create new
    );

    res.json(contact);
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

//@route  DELETE  api/contacts/:id
//@desc   delete contact
//@access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    //no need for variable because we dont need to put anything now
    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//have to write this otherwise it wont work
module.exports = router;
