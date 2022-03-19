const { Schema } = require("mongoose");
const {
  modelsName: { TOPICS },
} = require("../../utils");

const QuestionSchema = new Schema({
  _id: { type: Number },
  annotations: [{ type: String, ref: TOPICS }],
});

module.exports = QuestionSchema;
