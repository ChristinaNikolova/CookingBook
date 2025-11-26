const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is requred"],
    minLength: [3, "Name should be at least 3 characters long"],
    maxLength: [30, "Name should be maximal 30 characters long"],
  },
  quantity: {
    type: String,
    required: [true, "Quantity is requred"],
    minLength: [3, "Quantity should be at least 3 characters long"],
    maxLength: [10, "Quantity should be maximal 10 characters long"],
  },
  unit: {
    type: String,
    required: [true, "Unit is requred"],
    minLength: [1, "Unit should be at least 1 character long"],
    maxLength: [10, "Unit should be maximal 10 characters long"],
  },
});

const Ingredient = model("Ingredient", ingredientSchema);
module.exports = Ingredient;
