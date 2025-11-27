const { Schema, model } = require("mongoose");
const { instruction } = require("../utils/constants/model");
const { errors } = require("../utils/constants/global");

const instructionSchema = new Schema({
  description: {
    type: String,
    required: [true, errors.REQUIRED_INPUT],
    minLength: [
      instruction.DESC_MIN_LEN,
      `Описанието трябва да е поне ${instruction.DESC_MIN_LEN} символа`,
    ],
    maxLength: [
      instruction.DESC_MIN_LEN,
      `Описанието трябва да е до ${instruction.DESC_MAX_LEN} символа`,
    ],
  },
});

const Instruction = model("Instruction", instructionSchema);
module.exports = Instruction;
