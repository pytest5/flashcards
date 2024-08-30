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
      (val) => val.length >= 2,
      "Uh oh, you need to have at least 2 distractors",
    ],
    lowercase: true, // need this to compare against answer
  },
  answer: {
    type: String,
    validate: [
      (val) => this.distractors.includes(val),
      "Uh oh, answer is not in your list of distractors",
    ],
    lowercase: true, // need this to compare against distractors
  },
  isChildFriendly: {
    type: Boolean,
    required: [true, "isChildFriendly is required"],
  },
  isMultipleChoice: {
    type: Boolean,
    required: [true, "isMultipleChoice is required"],
  },
  decks: [{ type: mongoose.ObjectId, ref: "Deck" }],
  user: { type: mongoose.ObjectId, ref: "User" },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
