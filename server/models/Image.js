const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
  data: {
    type: Buffer,
    required: [true, "Date is required"],
  },
  contentType: {
    type: String,
    required: [true, "Content type is required"],
  },
  fileName: {
    type: String,
    required: [true, "File name is required"],
  },
  size: {
    type: Number,
  },
});

const Image = model("Image", imageSchema);
module.exports = Image;
