//to access the protected and encrypted routes

//to verify our token
const jwt = require("jsonwebtoken");

//we need acces to the secret
const config = require("config");

//next fxn is to move on to the next piece of middleware
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //if there is a token we need to verify
  try {
    //decoded is the entire token payload
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //we just want the user
    req.user = decoded.user;
    //move on to the next
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
