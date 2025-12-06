const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const { getFavs, getLastThree } = require("../services/recipes");
const { mapErrors } = require("../utils/parser");

router.get("/", hasUser(), async (req, res) => {
  try {
    const userId = req.user._id;
    const recipes = await getLastThree(userId);
    res.json(recipes);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.get("/fav", hasUser(), async (req, res) => {
  try {
    const userId = req.user._id;
    const recipes = await getFavs(userId);
    res.json(recipes);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
