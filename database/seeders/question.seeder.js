const Questions = require("../../models/questions");
const { questions } = require("./sheetsData");
const {
  modelsName: { QUESTIONS },
  getModeledQuestionData,
} = require("../../utils");

const [, ...questionsData] = questions.values;

const name = QUESTIONS;
const order = 2;

const seed = async () => {
  if ((await Questions.countDocuments()) !== 0) await Questions.deleteMany({});
  const questions = await Questions.bulkyImportQuestions(
    getModeledQuestionData(questionsData)
  );
  return questions;
};

module.exports = {
  name,
  seed,
  order,
};
