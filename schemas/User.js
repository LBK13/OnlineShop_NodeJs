const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new Schema({
  fullName: { type: String, required: true, trim: true },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Username should be an email!");
      }
    },
  },
  password: { type: String, required: true},
  phoneNumber: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Phone number has to have +998XXYYYZZCC format");
      }
    },
  },
  isAdmin: { type: Boolean, required: true },
});

module.exports = mongoose.model("user", UserSchema);
