const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// if (process.env.NODE_ENV === "development") mongoose.set("debug", true);

const models = path.join(__dirname, "../models");

// Bootstrap models
fs.readdirSync(models)
  .filter((file) => ~file.indexOf(""))
  .forEach((file) => require(path.join(models, file)));

function connect() {
  const {
    MONGODBURL,
    MONGO_PASSWORD,
    MONGO_USER,
    ATLASUSERNAME,
    ATLASPASSWORD,
    DATABASENAME,
  } = process.env;
  const options = {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const mongoAtlasUrl = `mongodb+srv://${ATLASUSERNAME}:${ATLASPASSWORD}@cluster0.q6x2i.mongodb.net/${DATABASENAME}?retryWrites=true&w=majority`;

  if (MONGO_USER && MONGO_PASSWORD) {
    options.auth = { user: MONGO_USER, password: MONGO_PASSWORD };
  }

  mongoose.connect(mongoAtlasUrl, options);

  return mongoose.connection;
}

module.exports = connect;
