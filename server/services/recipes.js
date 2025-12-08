const {
  Types: { ObjectId },
} = require("mongoose");
const Recipe = require("../models/Recipe");
const Instruction = require("../models/Instruction");
const Ingredient = require("../models/Ingredient");
const { errors, admin } = require("../utils/constants/global");
const {
  recipeViewModel,
  recipeSlimViewModel,
  recipeAdminViewModel,
} = require("../utils/mapper/recipe");

async function all() {
  return (await Recipe.find({}).sort({ title: 1 })).map(recipeAdminViewModel);
}

async function searchByTitle(query) {
  return (
    await Recipe.find({ title: { $regex: query, $options: "i" } }).sort({
      title: 1,
    })
  ).map(recipeSlimViewModel);
}

async function getByCategory(categoryId, userId, take, skip) {
  return (
    await Recipe.find({
      category: new ObjectId(categoryId),
      author: new ObjectId(userId),
    }).sort({
      createdAt: -1,
    })
  )
    .skip(skip)
    .limit(take)
    .map(recipeSlimViewModel);
}

// todo check find 2 riteria
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

    return recipeViewModel(recipe);
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

async function update(
  id,
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
  const recipe = await Recipe.findById(id);

  checkOwner(recipe.author, userId);

  if (recipe.title.toLowerCase() !== title.toLowerCase()) {
    const result = await getByTitle(title);

    if (result) {
      throw new Error(errors.TITEL_TAKEN);
    }
  }

  const instructionIds = [];
  const ingredientIds = [];

  const oldInstructionIds = [...recipe.instructions];
  const oldIngredientIds = [...recipe.ingredients];

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

    recipe.title = title;
    recipe.summary = summary;
    recipe.neededTime = neededTime;
    recipe.portions = portions;
    recipe.isBabySafe = isBabySafe;
    recipe.category = category;
    recipe.instructions = instructionIds;
    recipe.ingredients = ingredientIds;

    if (image) {
      recipe.image = image;
    }
    await recipe.save();

    if (oldInstructionIds.length > 0) {
      await Instruction.deleteMany({ _id: { $in: oldInstructionIds } });
    }

    if (oldIngredientIds.length > 0) {
      await Ingredient.deleteMany({ _id: { $in: oldIngredientIds } });
    }

    return recipeViewModel(recipe);
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

async function deleteById(id, userId) {
  const recipe = await Recipe.findById(id);

  if (userId !== admin.ID) {
    checkOwner(recipe.author, userId);
  }

  return Recipe.findByIdAndDelete(id);
}

async function like(id, userId) {
  const recipe = await Recipe.findById(id);
  checkOwner(recipe.author, userId);
  recipe.isFav = !recipe.isFav;

  await recipe.save();

  return recipe.isFav;
}

async function getById(id) {
  const recipe = await Recipe.findById(id)
    .populate("category", "name")
    .populate("author", "_id")
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

// todo test this
async function getTotalCategoryCount(categoryId, userId) {
  return Recipe.countDocuments({
    category: new ObjectId(categoryId),
    author: new ObjectId(userId),
  });
}

async function getByTitle(title) {
  return Recipe.findOne({ title }).collation({
    locale: "bg",
    strength: 2,
  });
}

function checkOwner(ownerId, userId) {
  if (ownerId.toString() !== userId) {
    throw new Error(errors.NOT_AUTHOR("рецептата", "я изтрие"));
  }
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
  searchByTitle,
  update,
  getTotalCategoryCount,
};
