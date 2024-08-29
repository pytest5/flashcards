const mongoose = require("mongoose");

const userSchema = new mongoose.userSchema({ username: String });
const User = mongoose.model("Tank", userSchema);

module.exports = User;
