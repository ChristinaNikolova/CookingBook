const { Schema, model } = require("mongoose");
const { errors } = require("../utils/constants/global");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, errors.REQUIRED_INPUT],
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

userSchema.index(
  { email: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const User = model("User", userSchema);
module.exports = User;
