const Deck = require("../models/Deck");

const create = async (req, res) => {
    const data = req.body
  try {
    const deck = await Deck.create(data);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create };
