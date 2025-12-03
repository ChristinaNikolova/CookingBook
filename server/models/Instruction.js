const { Schema, model } = require("mongoose");
const { instruction } = require("../utils/constants/model");
const { errors } = require("../utils/constants/global");

const instructionSchema = new Schema({
  description: {
    type: String,
    required: [true, errors.REQUIRED_INPUT],
    minLength: [
      instruction.DESC_MIN_LEN,
      errors.REQUIRED_MIN_LEN("Описанието", instruction.DESC_MIN_LEN),
    ],
    maxLength: [
      instruction.DESC_MAX_LEN,
      errors.REQUIRED_MAX_LEN("Описанието", instruction.DESC_MAX_LEN),
    ],
  },
});

const Instruction = model("Instruction", instructionSchema);
module.exports = Instruction;
