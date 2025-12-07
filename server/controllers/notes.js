const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const { all, create } = require("../services/notes");
const { mapErrors } = require("../utils/parser");

router.get("/", hasUser(), async (req, res) => {
  try {
    const userId = req.user._id;
    const notes = await all(userId);
    res.json(notes);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.post("/", hasUser(), async (req, res) => {
  try {
    const userId = req.user._id;
    const note = await create(req.body.description, userId);
    res.json(note);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
