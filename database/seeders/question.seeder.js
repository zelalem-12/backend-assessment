const Questions = require("../../models/questions");
const { parseQuestionCSV } = require("./csvParser");
const {
  modelsName: { QUESTIONS },
  getModeledQuestionData,
} = require("../../utils");

const name = QUESTIONS;
const order = 2;

const seed = async () => {
  try {
    if ((await Questions.countDocuments()) !== 0)
      await Questions.deleteMany({});
    const questionsData = await parseQuestionCSV();
    const questions = await Questions.bulkyImportQuestions(
      getModeledQuestionData(questionsData)
    );
    return questions;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  name,
  seed,
  order,
};
