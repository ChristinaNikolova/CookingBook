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
} = require("../services/recipes");
const { filePaths } = require("../utils/constants/global");
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

router.get("/byCategory/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const recipe = await getByCategory(id, userId);
    res.json(recipe);
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
