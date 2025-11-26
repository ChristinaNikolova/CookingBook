const express = require("express");
const databaseConfig = require("./config/database");
const expressConfig = require("./config/express");
const routesConfig = require("./config/routes");

start();

async function start() {
  const app = express();

  expressConfig(app);
  await databaseConfig(app);
  routesConfig(app);

  // todo add constant
  app.listen(3030, () => console.log("REST service started"));
}
