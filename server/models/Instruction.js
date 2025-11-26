const { Schema, model } = require("mongoose");

const instructionSchema = new Schema({
  content: {
    type: String,
  },
});

const Instruction = model("Instruction", instructionSchema);
module.exports = Instruction;
