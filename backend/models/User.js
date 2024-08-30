const { Schema, model } = require("mongoose");

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
  },
});

module.exports = model("User", userSchema);
