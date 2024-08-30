const Card = require("../models/Card");
const User = require("../models/User");
// const Deck = require("../models/Deck");\

// TODO: populate, push deck refs

async function getAllByCurrentUserId(req, res) {
  const currentUserId = "66d182fc334055eb1cde0581"; // add your own currentUserId
  if (!req.body) res.status(400).json({ error: "Invalid request body" });
  try {
    const cards = await Card.find({ user: currentUserId });
    res.status(200).json(cards);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to retrieve cards" });
  }
}

async function getByCardId(req, res) {
  const cardId = req.params.cardId;
  if (!cardId) res.status(400).json({ error: "Invalid card id" });
  try {
    const card = await Card.findById(cardId);
    res.status(200).json(card);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to retrieve card" });
  }
}

async function getAll(req, res) {
  const cardId = req.params.cardId;
  if (!cardId) res.status(400).json({ error: "Invalid card id" });
  try {
    const card = await Card.find({});
    res.status(200).json(card);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to retrieve cards" });
  }
}

async function create(req, res) {
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

async function destroy(req, res) {
  const cardId = req.params.cardId;
  if (!cardId) res.status(400).json({ error: "Invalid card id" });
  try {
    await Card.findByIdAndDelete(cardId);
    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to delete card" });
  }
}

async function update(req, res) {
  const cardId = req.params.cardId;
  if (!cardId) res.status(400).json({ error: "Invalid card id" });
  if (!req.body) res.status(400).json({ error: "Invalid request body" });
  try {
    const card = await Card.findByIdAndUpdate(cardId, req.body, { new: true });
    console.log("hi");
    res.status(201).json(card);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to update card" });
  }
}

module.exports = {
  create,
  getAll,
  getByCardId,
  getAllByCurrentUserId,
  destroy,
  update,
};
