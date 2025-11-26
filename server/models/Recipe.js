const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

// todo add constant

// summary
// notes []
// instruction []
// ingredient []
// image
// category
// Baby Safe
// time
// portions
// author
const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [3, "Title should be at lease 3 characters long"],
      maxLength: [50, "Title should be maximal 50 characters long"],
      unique: true,
    },
    summary: {
      type: String,
      maxLength: [300, "Summary should be maximal 300 characters long"],
    },
    image: {
      type: ObjectId,
      ref: "Image",
      required: true,
    },
    instructions: {
      type: [ObjectId],
      ref: "Instruction",
      default: [],
    },
    ingredients: {
      type: [ObjectId],
      ref: "Ingredient",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

recipeSchema.index(
  {
    title: 1,
  },
  {
    unique: true,
    collation: {
      locale: "bg",
      strength: 2,
    },
  }
);

const Recipe = model("Recipe", recipeSchema);
module.exports = Recipe;
