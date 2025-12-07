const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const categoriesController = require("../controllers/categories");
const notesController = require("../controllers/notes");
const recipesController = require("../controllers/recipes");
const usersController = require("../controllers/users");
const adminCategoriesController = require("../controllers/admin/categories");
const adminRecipesController = require("../controllers/admin/recipes");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);
  app.use("/categories", categoriesController);
  app.use("/notes", notesController);
  app.use("/recipes", recipesController);
  app.use("/users", usersController);
  app.use("/admin/categories", adminCategoriesController);
  app.use("/admin/recipes", adminRecipesController);
};
