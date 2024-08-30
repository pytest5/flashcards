const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "username is required"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "an email address is required"],
    lowercase: true,
    trim: true,
    validate: { validator: isEmail, message: "Invalid email address format" },
  },
  hashedPassword: {
    type: String,
    required: [true, "a password is required"],
    match: /^[A-Za-z\d]{3,}$/,
  }, //bcrypt is alphanumeric only, setting minlength of 3 for test purposes
  dateOfBirth: { type: Date, required: [true, "date of birth is required"] },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
    delete returnedObject.email;
    delete returnedObject.dateOfBirth;
  },
});

module.exports = model("User", userSchema);
