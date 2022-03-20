const {
  modelsName: { TOPICS },
} = require("../../utils");

async function bulkyImportTopics(topics) {
  const Topics = this.model(TOPICS);

  try {
    const bulkyImportedDocuments = await Promise.all(
      topics.map((topic) => {
        const newTopic = new Topics({
          _id: topic._id,
          path: topic.path,
        });
        return newTopic.createTopics();
      })
    );
    return bulkyImportedDocuments;
  } catch (err) {
    throw {
      message: err.message || "An error occured while  saving topics",
      status: err.status || 500,
    };
  }
}

async function getTopics(topic) {
  const Topics = this.model(TOPICS);

  if (!topic || typeof topic !== "string") return [];

  let queryTopic = `,${topic},`;
  if (topic.includes(",")) queryTopic = `,'${topic}',`;

  try {
    const subTopicQuestion = await Topics.aggregate([
      { $match: { path: { $regex: queryTopic, $options: "i" } } },
      { $project: { path: 0 } },
      {
        $lookup: {
          from: "questions",
          let: { topic: "$_id" },
          pipeline: [
            { $match: { $expr: { $in: ["$$topic", "$annotations"] } } },
          ],
          as: "question",
        },
      },
      { $match: { $expr: { $gte: [{ $size: "$question" }, 1] } } },
      { $unwind: { path: "$question" } },
      {
        $group: {
          _id: "$question._id",
          annotations: { $first: "$question.annotations" },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          questionNumber: "$_id",
          annotations: 1,
        },
      },
    ]);
    return subTopicQuestion;
  } catch (err) {
    throw {
      message: err.message || "An error occured while getting topics",
      status: err.status || 500,
    };
  }
}

module.exports = {
  getTopics,
  bulkyImportTopics,
};
