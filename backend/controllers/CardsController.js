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
  console.log(req.body);
  if (!req.body) res.status(400).json({ error: "Invalid request body" });
  try {
    const { decks, user } = req.body[0];
    const isUserInDb = await User.findById(user);
    if (!isUserInDb)
      return res
        .status(404)
        .json({ error: "Error retrieving current user for card creation" });
    const isDeckInDb = await Deck.findById(decks[0]);
    if (!isDeckInDb)
      return res.status(404).json({
        error: "Deck not found. Cannot create card with a non existent deck",
      });
    const createdCards = await Card.create(req.body);
    res.status(201).json(createdCards);
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
    const cards = await Card.find(query).populate("decks").exec();
    if (cards.length === 0) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function updateMany(req, res) {
  const cardIds = req.body.cardIds;
  try {
    const cards = await Card.find({ _id: { $in: cardIds } });
    if (!cards || cards.length === 0) {
      res.status(404).json({
        error: `Could not update: Unable to find cards: ${cardIds}`,
      });
    }
    const result = await Card.updateMany(
      {
        _id: { $in: cardIds },
      },
      { isChildFriendly: false }
    );
    if (!result)
      return res.status(404).json({ error: "Unable to update cards." });
    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to update cards" });
  }
}

async function destroyMany(req, res) {
  const cardIds = req.body.cardIds;
  try {
    const cards = await Card.find({ _id: { $in: cardIds } });
    if (!cards || cards.length === 0) {
      res.status(404).json({
        error: `Could not delete: Unable to find cards: ${cardIds}`,
      });
    }
    const result = await Card.deleteMany({ _id: { $in: cardIds } });
    if (!result)
      return res.status(404).json({ error: "Unable to delete cards." });
    res.status(204).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to update cards" });
  }
}

async function createMany(req, res) {
  const toBeCreatedCards = req.body[0].toBeCreatedCards;
  try {
    const result = await Card.insertMany(toBeCreatedCards);
    if (!result)
      return res.status(404).json({ error: "Unable to create cards." });
    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to create cards" });
  }
}

module.exports = {
  create,
  createMany,
  getAll,
  getByCardId,
  getAllByCurrentUserId,
  destroy,
  destroyMany,
  update,
  updateMany,
  index,
};
