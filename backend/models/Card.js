const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  front: { type: String },
  frontImageUrl: {
    type: String,
  },
  audioUrl: { type: String },
  rear: { type: String },
  rearImageUrl: { type: String },
  distractors: {
    type: Array,
    validate: [
      (val) => val === null || val.length >= 2,
      "Uh oh, you need to have at least 2 distractors",
    ],
  },
  answer: {
    type: String,
  },
  isChildFriendly: {
    type: Boolean,
    required: [true, "isChildFriendly is required"],
  },
  isMultipleChoice: {
    type: Boolean,
    required: [true, "isMultipleChoice is required"],
  },
  decks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Deck" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
