const { Schema, model } = require("mongoose");

const deckSchema = new Schema({
  deckName: {
    type: String,
    required: [true, "deck name is required"],
    trim: true,
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: [true, "subject is required"],
  },
  description: { type: String, trim: true },
  visibility: {
    enum: ["public", "private"],
    required: true,
  },
  isArchived: { type: Boolean, default: false },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "all decks must have a user"],
  },
});

module.exports = model("Deck", deckSchema);
