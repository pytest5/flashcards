const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: { type:String, required: true },
    email: { type:String, unique: true, required: true },
    hashedPassword: { type:String, required: true },
    isChild: Boolean
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      delete returnedObject.hashedPassword;
    },
  });
  
  module.exports = model("User", userSchema);