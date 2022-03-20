const fs = require("fs");
const util = require("util");
const path = require("path");
const readFile = util.promisify(fs.readFile);

const parseQuestionCSV = async () => {
  const csv_data = await readFile(
    path.join(__dirname, "../../dataSheets/questions.csv"),
    "utf-8"
  );
  const [, ...data_rows] = csv_data.split(/\r?\n/);
  const parsedCsv = data_rows.map((data_row) => {
    const questoin = data_row
      .replace(/(^[,]+)|([,]+$)/g, "")
      .split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/)
      .map((topic) => topic.replace(/(^"|"$)/g, ""));
    return questoin;
  });

  return parsedCsv;
};

const parseTopicCSV = async () => {
  const csv_data = await readFile(
    path.join(__dirname, "../../dataSheets/topics.csv"),
    "utf-8"
  );

  const [, ...data_rows] = csv_data.split(/\r?\n/);

  const parsedCsv = data_rows.map((pathString) => {
    const pathTopics = pathString
      .replace(/(^[,]+)|([,]+$)/g, "")
      .split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/)
      .map((topic) => topic.replace(/(^"|"$)/g, ""));

    return pathTopics;
  });
  return parsedCsv;
};

module.exports = {
  parseQuestionCSV,
  parseTopicCSV,
};
