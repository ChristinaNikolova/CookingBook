const { Schema, model } = require("mongoose");
const { ingredient } = require("../utils/constants/model");
const { errors } = require("../utils/constants/global");

const ingredientSchema = new Schema({
  description: {
    type: String,
    required: [true, errors.REQUIRED_INPUT],
    minLength: [
      ingredient.DESC_MIN_LEN,
      errors.REQUIRED_MIN_LEN("Описанието", ingredient.DESC_MIN_LEN),
    ],
    maxLength: [
      ingredient.DESC_MAX_LEN,
      errors.REQUIRED_MAX_LEN("Описанието", ingredient.DESC_MAX_LEN),
    ],
  },
});

const Ingredient = model("Ingredient", ingredientSchema);
module.exports = Ingredient;
