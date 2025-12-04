// todo clean
function categoryViewModel(category) {
  return {
    id: category._id,
    name: category.name,
    description: category.description,
    image: category.image,
  };
}

function categoryNameViewModel(category) {
  return {
    id: category._id,
    name: category.name,
  };
}

module.exports = {
  categoryViewModel,
  categoryNameViewModel,
};
