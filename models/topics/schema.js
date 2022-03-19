const { Schema } = require("mongoose");

const TopicSchema = new Schema({
  _id: { type: String },
  path: { type: String, default: null },
});

module.exports = TopicSchema;
