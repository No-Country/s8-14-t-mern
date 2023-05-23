const express = require("express");

const config = require("./config");
const dataBase = require("./utils/database");



const app = express();

app.use(express.json());

//Here DB is connected
dataBase()

app.get("/", (req, res) => {

  res.status(200).json({
    message: "OK!",
    indieFilms: `localhost: ${config.port}/api/v1/pigmeo`
  });

});

const server = app.listen(config.port, () => {

  console.log(`Server started at ${config.port}`);

});

