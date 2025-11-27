const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");
const { recipe } = require("../utils/constants/model");
const { errors } = require("../utils/constants/global");

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, errors.REQUIRED_INPUT],
      minLength: [
        recipe.TITLE_MIN_LEN,
        `Заглавието трябва да е поне ${recipe.TITLE_MIN_LEN} символа`,
      ],
      maxLength: [
        recipe.TITLE_MAX_LEN,
        `Заглавието трябва да е до ${recipe.TITLE_MAX_LEN} символа`,
      ],
      unique: true,
    },
    summary: {
      type: String,
      maxLength: [
        recipe.SUMMARY_MAX_LEN,
        `Описанието трябва да е до ${recipe.SUMMARY_MAX_LEN} символа`,
      ],
    },
    neededTime: {
      type: String,
      required: [true, errors.REQUIRED_INPUT],
      maxLength: [
        recipe.NEEDED_TIME_MAX_LEN,
        `Необходимото време трябва да е до ${recipe.NEEDED_TIME_MAX_LEN} символа`,
      ],
    },
    portions: {
      type: Number,
      required: [true, errors.REQUIRED_INPUT],
      min: [recipe.PORTIONS_MIN, `Порциите трябва да са положително число`],
    },
    isBabySafe: {
      type: Boolean,
      default: false,
    },
    image: {
      type: ObjectId,
      ref: "Image",
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    author: {
      type: ObjectId,
      ref: "User",
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
