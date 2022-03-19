const Topics = require("../models/topics");

async function getSubTopicQuestions(req, res) {
  const topicName = req.query.q;
  if (!topicName && typeof topicName !== "string") {
    return res.status(400).send({ message: "Missing topic search query!" });
  }
  try {
    const subTopicQUestions = await Topics.getTopics(topicName);
    res.send(subTopicQUestions);
  } catch (err) {
    res.status(err.status || 500).send({});
  }
}

module.exports = {
  getSubTopicQuestions,
};
