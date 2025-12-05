const router = require("express").Router();
const { isAdmin } = require("../../middlewares/guards");
const upload = require("../../middlewares/fileUpload");
const { all, create, deleteById } = require("../../services/categories");
const { mapErrors } = require("../../utils/parser");
const { filePaths } = require("../../utils/constants/global");

router.get("/", isAdmin(), async (req, res) => {
  try {
    const categories = await all();
    res.json(categories);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.post("/", isAdmin(), upload.single("image"), async (req, res) => {
  try {
    const imagePath = filePaths.CATEGORIES + req.file.filename;
    const category = await create(
      req.body.name,
      req.body.description,
      imagePath
    );

    res.json(category);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.delete("/:id", isAdmin(), async (req, res) => {
  try {
    const id = req.params.id;
    await deleteById(id);
    res.status(204).end();
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
