const mongoose = require("mongoose");

const {
  modelsName: { TOPICS },
} = require("../../utils");

const TopicSchema = require("./schema");
const topicStaticFunctions = require("./statics");
const topicInstanceFunctions = require("./methods");

TopicSchema.static(topicStaticFunctions);
TopicSchema.method(topicInstanceFunctions);

module.exports = mongoose.model(TOPICS, TopicSchema);
