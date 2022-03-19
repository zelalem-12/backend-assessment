const modelsName = {
  TOPICS: "Topics",
  QUESTIONS: "Questions",
};

const getModeledQuestionData = (questions) => {
  return questions.map((dataItem) => {
    const [questionNumber, ...annotations] = dataItem;
    const questionObject = {
      questionNumber: parseInt(questionNumber),
      annotations,
    };
    return questionObject;
  });
};

const getModeledTopicData = (uniquePaths) => {
  const topicNodes = [];
  uniquePaths.forEach((uniquePath) => {
    let nodePath = null;
    for (node of uniquePath) {
      let currentNode = node + ",";
      if (node && node.includes(",")) currentNode = `'${node}',`;
      topicNodes.push({ _id: node, path: nodePath });
      nodePath = nodePath ? nodePath + currentNode : "," + currentNode;
    }
  });

  return [...new Map(topicNodes.map((node) => [node._id, node])).values()];
};

module.exports = {
  modelsName,
  getModeledTopicData,
  getModeledQuestionData,
};
