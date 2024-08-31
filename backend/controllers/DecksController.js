const Deck = require("../models/Deck");

// validation check for POST
const isFormFilled = (data) => {
  if (!data.deckName) {
    return { error: "A deck name is required" };
  }
  if (!data.subject) {
    return { error: "A subject type is required." };
  }
  if (!data.visibility) {
    return { error: "Please set the deck's visibility in the form." };
  }
  if (!data.user) {
    return { error: "Not authorized." };
  }
};

// shared validation checks for POST and PUT
const validateData = (data) => {
  for (const key in data) {
    if (!data[key]) {
      if (key === "isArchived" && data[key] !== false) {
        return { error: `${key} does not have a valid value.` };
      }
      if (key === "description") {
        continue;
      }
      if (key !== "description" && key !== "isArchived") {
        return { error: `${key} is not a valid value.` };
      }
    }
  }

  if (data.deckName && data.deckName.trim() === "") {
    return { error: "A deck name is required" };
  }
  if (data.subject && data.subject.trim() === "") {
    return { error: "A subject type is required." };
  }
  if (data.visibility && data.visibility.trim() === "") {
    return { error: "Please set visibility for your deck." };
  }
  if (
    data.visibility &&
    data.visibility !== "public" &&
    data.visibility !== "private"
  ) {
    return { error: "Invalid selection. Please set visibility for your deck." };
  }
  if (data.isArchived && typeof data.isArchived !== "boolean") {
    return { error: "Invalid selection. Please archive the deck via settings" };
  }
  if (data.user && data.user.trim() === "") {
    return { error: "Not authorized." };
  }
};

const create = async (req, res) => {
  const data = req.body;
  const notFilled = isFormFilled(data);
  if (notFilled) {
    return res.status(400).json(notFilled);
  }

  const invalidData = validateData(data);
  if (invalidData) {
    return res.status(400).json(invalidData);
  }

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
  if (!deckId) {
    return res.status(400).json({ error: "Invalid request." });
  }
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
  if (!deckId) {
    return res.status(400).json({ error: "Invalid request." });
  }
  try {
    await Deck.findByIdAndDelete(deckId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { deckId } = req.params;
  if (!deckId) {
    return res.status(400).json({ error: "Invalid request." });
  }
  const data = req.body;
  const invalidData = validateData(data);
  if (invalidData) {
    return res.status(400).json(invalidData);
  }
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
