const mongoose = require("mongoose");

module.exports = async (app) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/cookingbook");
    console.log("Database connected");

    mongoose.connection.on("error", (err) => {
      console.log("Error");
      console.log(err);
    });
  } catch (err) {
    // todo add constants
    console.error("Error connecting to database");
    process.exit(1);
  }
};
