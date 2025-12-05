function categoryViewModel(category) {
  return {
    id: category._id,
    name: category.name,
    description: category.description,
    image: category.image,
  };
}

module.exports = {
  categoryViewModel,
};
