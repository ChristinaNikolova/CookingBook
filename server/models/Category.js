const { Schema, model } = require("mongoose");
const { category } = require("../utils/constants/model");
const { errors } = require("../utils/constants/global");

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, errors.REQUIRED_INPUT],
    minLength: [
      category.NAME_MIN_LEN,
      errors.REQUIRED_MIN_LEN("Името", category.NAME_MIN_LEN),
    ],
    maxLength: [
      category.NAME_MAX_LEN,
      errors.REQUIRED_MAX_LEN("Името", category.NAME_MAX_LEN),
    ],
    unique: true,
  },
  description: {
    type: String,
    required: [true, errors.REQUIRED_INPUT],
    maxLength: [
      category.DESC_MAX_LEN,
      errors.REQUIRED_MAX_LEN("Описанието", category.DESC_MAX_LEN),
    ],
  },
  image: {
    type: String,
    required: [true, errors.REQUIRED_INPUT],
  },
});

categorySchema.index(
  { name: 1 },
  {
    unique: true,
    collation: {
      locale: "bg",
      strength: 2,
    },
  }
);

const Category = model("Category", categorySchema);
module.exports = Category;
