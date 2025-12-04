const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const recipesController = require("../controllers/recipes");
const categoriesController = require("../controllers/categories");
const adminCategoriesController = require("../controllers/admin/categories");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);
  app.use("/recipes", recipesController);
  app.use("/categories", categoriesController);
  app.use("/admin/categories", adminCategoriesController);
};
