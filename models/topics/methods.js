async function createTopics() {
  try {
    const newTopic = await this.save();
    return newTopic;
  } catch (err) {
    throw {
      message: err.message || "An Error occured while inserting a topic",
      status: 500,
    };
  }
}

module.exports = {
  createTopics,
};
