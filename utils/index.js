const modelsName = {
  TOPICS: "Topics",
  QUESTIONS: "Questions",
};

const getModeledQuestionData = (questionsData) => {
  const questions = questionsData
    .map((dataItem) => {
      const [questionNumber, ...annotations] = dataItem;

      if (!isNaN(questionNumber)) {
        const questionObject = {
          questionNumber: parseInt(questionNumber),
          annotations: annotations
            .map((annotation) => annotation.replaceAll(/\s+/g, " ").trim())
            .filter((annotation) => !!annotation),
        };
        return questionObject;
      }
    })
    .filter((question) => !!question);
  return questions;
};

const getModeledTopicData = (uniquePaths) => {
  const topicNodes = [];
  uniquePaths.forEach((uniquePath) => {
    let nodePath = null;
    for (let node of uniquePath) {
      const validTopic = node.replaceAll(/\s+/g, " ").trim();
      if (validTopic) {
        let currentNode = validTopic + ",";
        if (validTopic.includes(",")) currentNode = `'${validTopic}',`;
        topicNodes.push({ _id: validTopic, path: nodePath });
        nodePath = nodePath ? nodePath + currentNode : "," + currentNode;
      }
    }
  });

  return [...new Map(topicNodes.map((node) => [node._id, node])).values()];
};

module.exports = {
  modelsName,
  getModeledTopicData,
  getModeledQuestionData,
};
