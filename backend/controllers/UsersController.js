const User = require("../models/User");
const { formatISO } = require("date-fns");
const { isEmail } = require("validator");
// const { hashSync, compareSync } = require("bcrypt");
// const { sign } = require("jsonwebtoken");

// validation check for POST
const isFormFilled = (data) => {
  if (!data.userName) {
    return { error: "A username is required" };
  }
  if (!data.email) {
    return { error: "An email address is required." };
  }
  if (!data.hashedPassword) {
    return { error: "A password is required." };
  }
  if (!data.dateOfBirth) {
    return { error: "You date of birth is required." };
  }
};

// shared validation checks for POST and PUT
const validateData = (data) => {
  const passwordRegex = /^[A-Za-z\d]{3,}$/;

  if (data.userName && data.userName.trim() === "") {
    return { error: "A username is required" };
  }
  if (data.email && data.email.trim() === "") {
    return { error: "An email address is required." };
  }
  if (data.email && !isEmail(data.email)) {
    return { error: "Invalid email address." };
  }
  if (data.hashedPassword && data.hashedPassword.trim() === "") {
    return { error: "A password is required." };
  }
  if (data.hashedPassword && !passwordRegex.test(data.hashedPassword)) {
    return {
      error: "Please refer to minimum requirements for setting a password.",
    };
  }
};

const create = async (req, res) => {
  const notFilled = isFormFilled(req.body);
  if (notFilled) {
    return res.status(400).json(notFilled);
  }

  const invalidData = validateData(req.body);
  if (invalidData) {
    return res.status(400).json(invalidData);
  }

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
};

const index = async (req, res) => {
  try {
    const users = await User.find({});
    if (users === null) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const show = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user === null) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const destroy = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// router.put("/userId", async (req, res) => {
//   const { userId } = req.params;
//   const formData = req.body;
//   validateData(formData);
// });

module.exports = { create, index, show, destroy };
