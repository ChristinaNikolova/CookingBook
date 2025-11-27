const { Schema, model } = require("mongoose");
const { errors } = require("../utils/constants/global");

const imageSchema = new Schema({
  data: {
    type: Buffer,
    required: [true, errors.REQUIRED_INPUT],
  },
  contentType: {
    type: String,
    required: [true, errors.REQUIRED_INPUT],
  },
  fileName: {
    type: String,
    required: [true, errors.REQUIRED_INPUT],
  },
  size: {
    type: Number,
  },
});

const Image = model("Image", imageSchema);
module.exports = Image;
