const Recipe = require("../models/Recipe");
const Instruction = require("../models/Instruction");
const Ingredient = require("../models/Ingredient");
const { errors } = require("../utils/constants/global");

async function create(
  title,
  summary,
  neededTime,
  portions,
  isBabySafe,
  category,
  instructions,
  ingredients,
  image,
  userId
) {
  let recipe = await getByTitle(title);

  if (recipe) {
    throw new Error(errors.TITEL_TAKEN);
  }

  const instructionIds = [];
  const ingredientIds = [];

  try {
    for (const curr of instructions) {
      const instruction = new Instruction({ description: curr });
      await instruction.save();
      instructionIds.push(instruction._id);
    }

    for (const curr of ingredients) {
      const ingredient = new Ingredient({ description: curr });
      await ingredient.save();
      ingredientIds.push(ingredient._id);
    }

    recipe = new Recipe({
      title,
      summary,
      neededTime,
      portions,
      isBabySafe,
      category,
      instructions: instructionIds,
      ingredients: ingredientIds,
      image,
      author: userId,
    });

    await recipe.save();

    return recipe;
  } catch (err) {
    // todo add constanta
    console.error("ROLLBACK STARTED:", err.message);

    if (instructionIds.length > 0) {
      await Instruction.deleteMany({ _id: { $in: instructionIds } });
    }

    if (ingredientIds.length > 0) {
      await Ingredient.deleteMany({ _id: { $in: ingredientIds } });
    }

    throw err;
  }
}

async function getByTitle(title) {
  return await Recipe.findOne({ title }).collation({
    locale: "bg",
    strength: 2,
  });
}

module.exports = {
  create,
};
