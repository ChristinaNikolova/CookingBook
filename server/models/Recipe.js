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
        errors.REQUIRED_MIN_LEN("Заглавието", recipe.TITLE_MIN_LEN),
      ],
      maxLength: [
        recipe.TITLE_MAX_LEN,
        errors.REQUIRED_MAX_LEN("Заглавието", recipe.TITLE_MAX_LEN),
      ],
      unique: true,
    },
    summary: {
      type: String,
      required: [true, errors.REQUIRED_INPUT],
      maxLength: [
        recipe.SUMMARY_MAX_LEN,
        errors.REQUIRED_MAX_LEN("Описанието", recipe.SUMMARY_MAX_LEN),
      ],
    },
    neededTime: {
      type: String,
      required: [true, errors.REQUIRED_INPUT],
      maxLength: [
        recipe.NEEDED_TIME_MAX_LEN,
        errors.REQUIRED_MAX_LEN(
          "Необходимото време",
          recipe.NEEDED_TIME_MAX_LEN
        ),
      ],
    },
    portions: {
      type: Number,
      required: [true, errors.REQUIRED_INPUT],
      min: [recipe.PORTIONS_MIN, "Порциите трябва да са положително число"],
    },
    isBabySafe: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: [true, errors.REQUIRED_INPUT],
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
