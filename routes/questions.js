const { getSubTopicQuestions } = require("../controllers");

module.exports = (app) => {
  app.get("/search", getSubTopicQuestions);
};
