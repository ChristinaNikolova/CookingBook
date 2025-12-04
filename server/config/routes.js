const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const adminCategoriesController = require("../controllers/admin/categories");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);
  app.use("/admin/categories", adminCategoriesController);
};
