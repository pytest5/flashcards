const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { formatISO } = require("date-fns");
// const { hashSync, compareSync } = require("bcrypt");
// const { sign } = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ email: req.body.email });
    if (userInDatabase) {
      return res
        .status(409)
        .json({ error: "You already have an existing account" });
    }

    const [year, month, day] = req.body.dateOfBirth;

    req.body.dateOfBirth = formatISO(new Date(year, month, day, 0, 0, 0));

    const user = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      hashedPassword: req.body.hashedPassword,
      dateOfBirth: req.body.dateOfBirth,
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;