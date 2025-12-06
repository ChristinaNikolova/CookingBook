const {
  Types: { ObjectId },
} = require("mongoose");
const Recipe = require("../models/Recipe");
const Instruction = require("../models/Instruction");
const Ingredient = require("../models/Ingredient");
const { errors } = require("../utils/constants/global");
const {
  recipeViewModel,
  recipeSlimViewModel,
  recipeAdminViewModel,
} = require("../utils/mapper/recipe");

async function all() {
  return (await Recipe.find({}).sort({ title: 1 })).map(recipeAdminViewModel);
}

async function getByCategory(categoryId, userId) {
  return (
    await Recipe.find({ category: new ObjectId(categoryId) }).sort({
      createdAt: -1,
    })
  )
    .filter((x) => x.author.toString() === userId)
    .map(recipeSlimViewModel);
}

async function getFavs(userId) {
  return (
    await Recipe.find({ author: new ObjectId(userId) }).sort({ title: 1 })
  )
    .filter((x) => x.isFav)
    .map(recipeSlimViewModel);
}

async function getLastThree(userId) {
  return (
    await Recipe.find({ author: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .limit(3)
  ).map(recipeSlimViewModel);
}

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
    console.error(errors.DATABASE_ERROR, err.message);

    if (instructionIds.length > 0) {
      await Instruction.deleteMany({ _id: { $in: instructionIds } });
    }

    if (ingredientIds.length > 0) {
      await Ingredient.deleteMany({ _id: { $in: ingredientIds } });
    }

    throw err;
  }
}

async function deleteById(id) {
  return Recipe.findByIdAndDelete(id);
}

async function like(id) {
  const recipe = await Recipe.findById(id);
  recipe.isFav = !recipe.isFav;
  await recipe.save();

  return recipe.isFav;
}

async function getById(id) {
  const recipe = await Recipe.findById(id)
    .populate("category", "name")
    .populate({
      path: "ingredients",
      populate: {
        path: "description",
      },
    })
    .populate({
      path: "instructions",
      populate: {
        path: "description",
      },
    });

  return recipeViewModel(recipe);
}

async function getByTitle(title) {
  return await Recipe.findOne({ title }).collation({
    locale: "bg",
    strength: 2,
  });
}

module.exports = {
  all,
  create,
  getById,
  deleteById,
  getByCategory,
  like,
  getFavs,
  getLastThree,
};
