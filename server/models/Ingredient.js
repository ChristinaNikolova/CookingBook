const { Schema, model } = require("mongoose");
const { ingredient } = require("../utils/constants/model");
const { errors } = require("../utils/constants/global");

const ingredientSchema = new Schema({
  description: {
    type: String,
    required: [true, errors.REQUIRED_INPUT],
    minLength: [
      ingredient.DESC_MIN_LEN,
      `Описанието трябва да е поне ${ingredient.DESC_MIN_LEN} символа`,
    ],
    maxLength: [
      ingredient.DESC_MAX_LEN,
      `Описанието трябва да е до ${ingredient.DESC_MAX_LEN} символа`,
    ],
  },
});

const Ingredient = model("Ingredient", ingredientSchema);
module.exports = Ingredient;
