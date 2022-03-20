const Topics = require("../../models/topics");
const { parseTopicCSV } = require("./csvParser");
const {
  modelsName: { TOPICS },
  getModeledTopicData,
} = require("../../utils");

const name = TOPICS;
const order = 1;

const seed = async () => {
  try {
    if ((await Topics.countDocuments()) === 0) await Topics.deleteMany({});
    const uniquePaths = await parseTopicCSV();
    const topics = await Topics.bulkyImportTopics(
      getModeledTopicData(uniquePaths)
    );
    return topics;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  name,
  seed,
  order,
};
