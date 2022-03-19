async function createQuestion() {
  try {
    const newQuestion = await this.save();
    return newQuestion;
  } catch (err) {
    throw {
      message: err.message || "An error occured while inserting a question",
      status: 500,
    };
  }
}

module.exports = {
  createQuestion,
};
