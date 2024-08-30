const Card = require("../models/Card");
const User = require("../models/User");
// const Deck = require("../models/Deck");

async function createCard(req, res) {
  const currentUserId = "66d182fc334055eb1cde0581"; // add your own currentUserId
  if (!req.body) res.status(400).json({ error: "Invalid request body" });
  try {
    const card = await Card.create(req.body);
    const user = await User.findById(currentUserId);
    // user.decks.push
    card.user = user;
    await card.save();
    res.status(201).json(card);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to create card" });
  }
}

module.exports = { createCard };
