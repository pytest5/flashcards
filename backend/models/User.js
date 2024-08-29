const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: String,
    email: String,
    hashedPassword: String,
    isChild: Boolean
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      delete returnedObject.hashedPassword;
    },
  });
  
  module.exports = model("User", userSchema);