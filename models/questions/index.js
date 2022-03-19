const mongoose = require("mongoose");

const {
  modelsName: { QUESTIONS },
} = require("../../utils");

const QuestionSchema = require("./schema");
const questionStaticFunction = require("./statics");
const questionInstanceFunctions = require("./methods");

QuestionSchema.static(questionStaticFunction);
QuestionSchema.method(questionInstanceFunctions);

module.exports = mongoose.model(QUESTIONS, QuestionSchema);
