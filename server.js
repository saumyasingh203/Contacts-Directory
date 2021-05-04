const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

//Connect Database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

//creating an end point so that we get something when server starts
//we can send a file too res.file but here we send a json object

//now we will make 3 different files for our routes
// app.get('/', (req, res) => {res.json({msg: 'Welcome to the Contacts-Directory API by Saumya Singh'})})

//Define routes
//we want every backend route to start with /api/users
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  //* means anything which is not the above 3 routes
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

//while developing, use port 5000, .env.PORT is for after deployment
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
