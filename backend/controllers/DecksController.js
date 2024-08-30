const Deck = require("../models/Deck");

const create = async (req, res) => {
  const data = req.body;
  try {
    const deck = await Deck.create(data);
    res.status(201).json({ deck });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const index = async (req, res) => {
  const { query } = req;
  try {
    const decks = await Deck.find(query);
    if (decks.length === 0) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json({ data: decks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const show = async (req, res) => {
  const { deckId } = req.params;
  try {
    const deck = await Deck.findById(deckId);
    if (deck === null) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json({ data: deck });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const destroy = async (req, res) => {
  const { deckId } = req.params;
  try {
    await Deck.findByIdAndDelete(deckId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
    const { deckId } = req.params;
    const data = req.body;
    // const invalidData = validateData(data);
    // if (invalidData) {
    //   return res.status(400).json(invalidData);
    // }
    try {
      const deck = await Deck.findByIdAndUpdate(deckId, data, {
        new: true,
        runValidators: true,
      });
      if (deck === null) {
        return res.status(404).json({ error: "Resource not found" });
      }
      res.status(200).json({ data: deck });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { create, index, show, destroy, update };
