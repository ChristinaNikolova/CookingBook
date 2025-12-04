const router = require("express").Router();
const upload = require("../middlewares/fileUpload");
const { hasUser } = require("../middlewares/guards");
const { create } = require("../services/recipes");
const { filePaths } = require("../utils/constants/global");
const { mapErrors } = require("../utils/parser");

// sled submit, scroll to the top to see the rroro + check isBabySafe why not checked
router.post("/", hasUser(), upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
    const imagePath = filePaths.RECIPES + req.file.filename;
    const recipe = await create(
      req.body.title,
      req.body.summary,
      req.body.neededTime,
      req.body.portions,
      req.body.isBabySafe,
      req.body.isBabySafe,
      req.body.instructions,
      req.body.ingredients,
      imagePath
    );

    res.json(recipe);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
