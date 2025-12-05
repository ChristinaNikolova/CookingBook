const router = require("express").Router();
const upload = require("../middlewares/fileUpload");
const { hasUser } = require("../middlewares/guards");
const { create, getById, getByCategory } = require("../services/recipes");
const { filePaths } = require("../utils/constants/global");
const { mapErrors } = require("../utils/parser");

// sled submit, scroll to the top to see the rroro + check isBabySafe why not checked
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

router.get("/:id", hasUser(), async (req, res) => {
  try {
    console.log("in");
    const id = req.params.id;
    const recipe = await getById("69318c61de39d9acb3e3d2f2");
    res.json(recipe);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
