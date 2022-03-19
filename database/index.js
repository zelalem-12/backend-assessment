const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

if (process.env.NODE_ENV === "development") mongoose.set("debug", true);

const models = path.join(__dirname, "../models");

// Bootstrap models
fs.readdirSync(models)
  .filter((file) => ~file.indexOf(""))
  .forEach((file) => require(path.join(models, file)));

function connect() {
  const mongoUser = process.env.MONGO_USER || null;
  const mongoPassword = process.env.MONGO_PASSWORD || null;
  const mongoURL = process.env.MONGODBURL;
  const options = {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (mongoUser && mongoPassword) {
    options.auth = { user: mongoUser, password: mongoPassword };
  }

  mongoose.connect(mongoURL, options);

  return mongoose.connection;
}

module.exports = connect;
