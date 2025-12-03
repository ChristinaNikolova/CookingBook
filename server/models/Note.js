const { Schema, model } = require("mongoose");
const { note } = require("../utils/constants/model");
const { errors } = require("../utils/constants/global");

const noteSchema = new Schema({
  description: {
    type: String,
    required: [true, errors.REQUIRED_INPUT],
    maxLength: [
      note.DESC_MAX_LEN,
      errors.REQUIRED_MAX_LEN("Описанието", note.DESC_MAX_LEN),
    ],
  },
});

const Note = model("Note", noteSchema);
module.exports = Note;
