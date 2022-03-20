const Topics = require("../models/topics");

async function getSubTopicQuestions(req, res) {
  const topicName = req.query.q;
  try {
    if (
      !topicName ||
      typeof topicName !== "string" ||
      !topicName.trim() ||
      !topicName.replaceAll(/\r?\n|\r/g, "")
    ) {
      return res.status(400).send({ message: "Missing topic search query!" });
    }

    const queryTopic = topicName.replaceAll(/\s+/g, " ").trim();
    const subTopicQUestions = await Topics.getSubTopicsQuestion(queryTopic);
    res.send(subTopicQUestions);
  } catch (err) {
    res
      .status(err.status || 500)
      .send({ message: err.message || "Server Error " });
  }
}

module.exports = {
  getSubTopicQuestions,
};
