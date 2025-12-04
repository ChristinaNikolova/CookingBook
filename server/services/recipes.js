const Recipe = require("../models/Recipe");
const { errors } = require("../utils/constants/global");

// todo where to parse portions
async function create(name, summary, neededTime, portions, isBabySafe, image) {
  let recipe = await getByName(name);

  if (recipe) {
    throw new Error(errors.NAME_TAKEN);
  }

  recipe = new Recipe({
    name,
    summary,
    neededTime,
    portions,
    isBabySafe,
    image,
  });

  console.log("HERE", recipe);

  //await recipe.save();

  //return recipe;
}

async function getByName(name) {
  return await Recipe.findOne({ name }).collation({
    locale: "bg",
    strength: 2,
  });
}

module.exports = {
  create,
};
