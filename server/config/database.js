const mongoose = require("mongoose");
const { important, messages, errors } = require("../utils/constants/global");

module.exports = async (app) => {
  try {
    await mongoose.connect(important.CONNECTION_STRING);
    console.log(messages.DATABASE_CONNECTED);

    mongoose.connection.on("error", (err) => {
      console.log(errors.DATABASE);
      console.log(err);
    });
  } catch (err) {
    console.error(errors.DATABASE_CONNECTION);
    process.exit(1);
  }
};
