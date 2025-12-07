const Category = require("../models/Category");
const { errors } = require("../utils/constants/global");
const { categoryViewModel } = require("../utils/mapper/category");

async function create(name, description, image) {
  let category = await getByName(name);

  if (category) {
    throw new Error(errors.NAME_TAKEN);
  }

  category = new Category({
    name,
    description,
    image,
  });

  await category.save();

  return category;
}

async function all() {
  return (await Category.find({}).sort({ name: 1 })).map(categoryViewModel);
}

async function deleteById(id) {
  return Category.findByIdAndDelete(id);
}

async function getByName(name) {
  return await Category.findOne({ name }).collation({
    locale: "bg",
    strength: 2,
  });
}

async function getById(id) {
  return Category.findById(id);
}

module.exports = {
  create,
  all,
  deleteById,
  getById,
};
