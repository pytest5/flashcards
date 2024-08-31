const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    lowercase: true, // ensures consistency for us
    required: true,
  },
});
const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
