const Topics = require("../../models/topics");
const { topics } = require("./sheetsData");
const {
  modelsName: { TOPICS },
  getModeledTopicData,
} = require("../../utils");

const [, ...uniquePaths] = topics.values;

const name = TOPICS;
const order = 1;

const seed = async () => {
  if ((await Topics.countDocuments()) === 0) await Topics.deleteMany({});
  const topics = await Topics.bulkyImportTopics(
    getModeledTopicData(uniquePaths)
  );
  return topics;
};

module.exports = {
  name,
  seed,
  order,
};
