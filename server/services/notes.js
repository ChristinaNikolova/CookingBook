const {
  Types: { ObjectId },
} = require("mongoose");
const Note = require("../models/Note");
const { noteViewModel } = require("../utils/mapper/note");
const { errors } = require("../utils/constants/global");

async function all(userId) {
  return (
    await Note.find({ author: new ObjectId(userId) }).sort({ createdAt: -1 })
  ).map(noteViewModel);
}

async function create(description, isList, userId) {
  const note = new Note({
    description,
    isList,
    author: userId,
  });

  await note.save();

  return noteViewModel(note);
}

async function deleteById(id, userId) {
  const note = await Note.findById(id);

  if (note.author.toString() !== userId) {
    throw new Error(errors.NOT_AUTHOR("бележката", "я изтрие"));
  }

  return Note.findByIdAndDelete(id);
}

module.exports = {
  all,
  create,
  deleteById,
};
