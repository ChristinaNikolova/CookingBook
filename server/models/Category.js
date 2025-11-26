const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is requred"],
    minLength: [3, "Name should be at least 3 characters long"],
    maxLength: [30, "Name should be maximal 30 characters long"],
    unique: true,
  },
  image: {
    type: String,
    required: [true, "Image is required"],
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
