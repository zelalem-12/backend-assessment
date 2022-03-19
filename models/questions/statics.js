const {
  modelsName: { QUESTIONS },
} = require("../../utils");

async function bulkyImportQuestions(questions) {
  const Questions = this.model(QUESTIONS);

  try {
    const bulkyImportedDocuments = await Promise.all(
      questions.map((question) => {
        const newQuestion = new Questions({
          _id: question.questionNumber,
          annotations: question.annotations,
        });
        return newQuestion.createQuestion();
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

module.exports = {
  bulkyImportQuestions,
};
