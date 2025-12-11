const router = require("express").Router();
const upload = require("../middlewares/fileUpload");
const { hasUser } = require("../middlewares/guards");
const {
  create,
  getById,
  getByCategory,
  deleteById,
  like,
  searchByTitle,
  update,
  getTotalCategoryCount,
} = require("../services/recipes");
const { filePaths, pagination } = require("../utils/constants/global");
const { mapErrors } = require("../utils/parser");

router.post("/", hasUser(), upload.single("image"), async (req, res) => {
  try {
    const imagePath = filePaths.RECIPES + req.file.filename;
    const userId = req.user._id;

    const recipe = await create(
      req.body.title,
      req.body.summary,
      req.body.neededTime,
      req.body.portions,
      req.body.isBabySafe,
      req.body.category,
      JSON.parse(req.body.instructions),
      JSON.parse(req.body.ingredients),
      imagePath,
      userId
    );

    res.json(recipe);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.put("/:id", hasUser(), upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const imagePath = req?.file?.filename
      ? filePaths.RECIPES + req.file.filename
      : "";

    const recipe = await update(
      id,
      req.body.title,
      req.body.summary,
      req.body.neededTime,
      req.body.portions,
      req.body.isBabySafe,
      req.body.category,
      JSON.parse(req.body.instructions),
      JSON.parse(req.body.ingredients),
      imagePath,
      userId
    );
    res.json(recipe);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.get("/byCategory/:id/:page", hasUser(), async (req, res) => {
  try {
    const currentPage = req.params.page;
    const id = req.params.id;
    const userId = req.user._id;

    const skip = (currentPage - 1) * pagination.RECIPES_PER_PAGE;
    const totalRecipesByCategory = await getTotalCategoryCount(id, userId);
    const pagesCount = Math.ceil(
      totalRecipesByCategory / pagination.RECIPES_PER_PAGE
    );

    const recipes = await getByCategory(
      id,
      userId,
      pagination.RECIPES_PER_PAGE,
      skip
    );
    res.json({ recipes, pagesCount, currentPage });
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.get("/searched/:query", hasUser(), async (req, res) => {
  try {
    const query = req.params.query;
    const recipes = await searchByTitle(query);
    res.json(recipes);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.post("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const result = await like(id, userId);
    res.json(result);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.get("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await getById(id);
    res.json(recipe);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.delete("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const recipe = await deleteById(id, userId);
    res.json(recipe);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
