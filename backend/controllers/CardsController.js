const Card = require("../models/Card");
const User = require("../models/User");
const Deck = require("../models/Deck");

async function getAllByCurrentUserId(req, res) {
  const currentUserId = req.user.id;
  try {
    const cards = await Card.find({ user: currentUserId }); // empty array will be returned so no error handling required
    res.status(200).json(cards);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to retrieve cards" });
  }
}

async function getByCardId(req, res) {
  const cardId = req.params.cardId;
  if (!cardId) res.status(400).json({ error: "Invalid card ID" });
  try {
    const card = await Card.findById(cardId);
    if (!card) return res.status(404).json({ error: "Card not found" });
    res.status(200).json(card);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to retrieve card" });
  }
}

async function getAll(req, res) {
  const cardId = req.params.cardId;
  if (!cardId) res.status(400).json({ error: "Invalid card ID" });
  try {
    const cards = await Card.find({}); // empty array will be returned so no error handling required
    res.status(200).json(cards);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to retrieve cards" });
  }
}

async function create(req, res) {
  const currentUserId = req.user.id; // get currentUserId from token
  if (!req.body) res.status(400).json({ error: "Invalid request body" });
  try {
    const { deckId, ...reqBody } = req.body;
    const card = await Card.create(reqBody);
    if (!card) return res.status(404).json({ error: "Error creating card" });
    // check if user exists
    const user = await User.findById(currentUserId);
    if (!user)
      return res
        .status(404)
        .json({ error: "Error retrieving current user for card creation" });
    // check if deck exists
    const deck = await Deck.findById(deckId);
    if (!deck)
      return res.status(404).json({
        error: "Deck not found. Cannot create card with a non existent deck",
      });
    // add refs
    card.decks.push(deckId);
    card.user = currentUserId;
    await card.save();
    res.status(201).json(card);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to create card" });
  }
}

async function destroy(req, res) {
  const { cardId } = req.params;
  if (!cardId) res.status(400).json({ error: "Invalid card ID" });
  try {
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      return res.status(404).json({
        error: "No card exists with the provided ID.",
      });
    }
    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to delete card" });
  }
}

async function update(req, res) {
  const cardId = req.params.cardId;
  if (!cardId) res.status(400).json({ error: "Invalid card ID" });
  if (!req.body) res.status(400).json({ error: "Invalid request body" });
  try {
    const card = await Card.findByIdAndUpdate(cardId, req.body, { new: true });
    if (!card)
      return res
        .status(404)
        .json({ error: "No card exists with the provided ID" });
    res.status(201).json(card);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to update card" });
  }
}

const index = async (req, res) => {
  const { query } = req;
  try {
    const cards = await Card.find(query);
    if (cards.length === 0) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getByCardId,
  getAllByCurrentUserId,
  destroy,
  update,
  index,
};
