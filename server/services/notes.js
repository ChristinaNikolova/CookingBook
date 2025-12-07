const {
  Types: { ObjectId },
} = require("mongoose");
const Note = require("../models/Note");
const { noteViewModel } = require("../utils/mapper/note");

async function all(userId) {
  return (
    await Note.find({ author: new ObjectId(userId) }).sort({ createdAt: -1 })
  ).map(noteViewModel);
}

module.exports = {
  all,
};
