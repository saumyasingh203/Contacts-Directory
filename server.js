const express = require('express');

const app = express();

//creating an end point so that we get something when server starts
//we can send a file too res.file
app.get('/', (req, res) => {res.json({msg: 'Welcome to the Contacts-Directory API by Saumya Singh'})})

//while developing, use port 5000, .env.PORT is for after deployment
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));