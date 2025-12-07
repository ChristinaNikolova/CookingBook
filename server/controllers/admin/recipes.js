const router = require("express").Router();
const { isAdmin } = require("../../middlewares/guards");
const { all, deleteById } = require("../../services/recipes");
const { mapErrors } = require("../../utils/parser");

router.get("/", isAdmin(), async (req, res) => {
  try {
    const recipes = await all();
    res.json(recipes);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.delete("/:id", isAdmin(), async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    await deleteById(id, userId);
    res.status(204).end();
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
