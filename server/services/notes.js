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

async function create(description, userId) {
  const note = new Note({
    description,
    author: userId,
  });

  await note.save();

  return note;
}

module.exports = {
  all,
  create,
};
