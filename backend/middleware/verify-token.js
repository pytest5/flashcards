const jwt = require("jsonwebtoken");

const getUser = (req) => req.user;

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log(verified);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid authorization token." });
  }
}

module.exports = { verifyToken, getUser };
