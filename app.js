const express = require("express");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

/* GET home page. */
require("./routes")(app);
require("./routes/questions")(app);

module.exports = app;
