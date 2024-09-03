const User = require("../models/User");
const {
  differenceInCalendarYears,
  startOfToday, // prevents user from submitting a DOB thats in the future / too far in the past
} = require("date-fns");
const { isEmail } = require("validator");
const { hashSync, compareSync } = require("bcrypt");
const { sign, JsonWebTokenError } = require("jsonwebtoken");

const SALT_LENGTH = 12;

// validation check for POST
const isFormFilled = (data) => {
  if (!data.userName) {
    return { error: "A username is required" };
  }
  if (!data.email) {
    return { error: "An email address is required." };
  }
  if (!data.password) {
    return { error: "A password is required." };
  }
  if (!data.confirmPassword) {
    return { error: "A matching password for confirmation is required." };
  }
  if (!data.dateOfBirth) {
    return { error: "You date of birth is required." };
  }
};

// shared validation checks for POST and PUT
const validateData = (data) => {
  const passwordRegex = /^[A-Za-z\d]{3,}$/; // checks if alpha numeric and minlength 3
  let age = -1;
  if (data.dateOfBirth) {
    age = differenceInCalendarYears(startOfToday(), data.dateOfBirth);
  }

  for (const key in data) {
    if (!data[key]) {
      return { error: `${key} is not a valid value.` };
    }
  }

  if (data.userName && data.userName.trim() === "") {
    return { error: "A username is required" };
  }
  if (data.email && data.email.trim() === "") {
    return { error: "An email address is required." };
  }
  if (data.email && !isEmail(data.email)) {
    return { error: "Invalid email address." };
  }
  if (data.password && data.password.trim() === "") {
    return { error: "A password is required." };
  }
  if (data.password && !passwordRegex.test(data.password)) {
    return {
      error: "Please refer to minimum requirements for setting a password.",
    };
  }
  if (data.dateOfBirth && (age > 200 || age < 0)) {
    return { error: "Please select a valid date of birth" };
  }
};

async function getCurrentUser(req, res) {
  const currentUserId = req.user.id;
  try {
    const currUser = await User.findById(currentUserId);
    res.json(currUser);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: `Unable to retrieve current user details` });
  }
}

const create = async (req, res) => {
  const data = req.body;
  if (data.password !== data.confirmPassword) {
    return res.status(400).json({ error: "password does not match" });
  }
  const notFilled = isFormFilled(data);
  if (notFilled) {
    return res.status(400).json(notFilled);
  }

  const invalidData = validateData(data);
  if (invalidData) {
    return res.status(400).json(invalidData);
  }

  try {
    const userInDatabase = await User.findOne({ email: data.email });
    if (userInDatabase) {
      return res
        .status(409)
        .json({ error: "You already have an existing account" });
    }

    data.hashedPassword = hashSync(data.password, SALT_LENGTH);
    delete data.password;
    delete data.confirmPassWord;

    const user = await User.create(data);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const index = async (req, res) => {
  const { query } = req;
  try {
    const users = await User.find(query);
    // if (users.length === 0) {
    // return res.status(404).json({ error: "Resource not found" });
    // }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const show = async (req, res) => {
  // find by userId
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "Invalid request." });
  }
  try {
    const user = await User.findById(userId);
    if (user === null) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const destroy = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "Invalid request." });
  }
  try {
    await User.findByIdAndDelete(userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "Invalid request." });
  }
  const data = req.body;
  const invalidData = validateData(data);
  if (invalidData) {
    return res.status(400).json(invalidData);
  }
  try {
    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });
    if (user === null) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
      return res.status(401).json({ error: "User not found" });
    }
    if (user && compareSync(req.body.password, user.hashedPassword)) {
      const token = sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json(token);
    } else {
      res.status(401).json({ error: "Invalid email or password." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCurrentUser,
  create,
  index,
  show,
  destroy,
  update,
  login,
};
