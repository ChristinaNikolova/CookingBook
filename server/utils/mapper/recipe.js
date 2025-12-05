// todo clean
function recipeAdminViewModel(recipe) {
  return {
    id: recipe._id,
    title: recipe.title,
  };
}

// todo test this
function recipeViewModel(recipe) {
  return {
    recipeAdminViewModel,
    summary: recipe.summary,
    neededTime: recipe.neededTime,
    portions: recipe.portions,
    category: recipe.category,
    image: recipe.image,
    isBabySafe: recipe.isBabySafe,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
  };
}

module.exports = {
  recipeAdminViewModel,
  recipeViewModel,
};
