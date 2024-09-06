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

async function verifyUserDeck(req, res) {
  try {
    const decks = await Deck.find({ user: req.user.id });
    req.decks = decks;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: `An error occurred while finding decks for user ID: ${req.user.id}`,
    });
  }
}
module.exports = { verifyToken, getUser, verifyUserDeck };
