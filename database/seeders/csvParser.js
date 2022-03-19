const fs = require("fs");
const util = require("util");
const path = require("path");
const readFile = util.promisify(fs.readFile);

// const topicsCSVFilePath = require("../../dataSheets/topics.csv");

String.prototype.splitCSV = function () {
  var matches = this.match(/(\s*"[^"]+"\s*|\s*[^,]+|,)(?=,|$)/g);
  for (var n = 0; n < matches.length; ++n) {
    matches[n] = matches[n].trim();
    if (matches[n] == ",") matches[n] = "";
  }
  if (this[0] == ",") matches.unshift("");
  return matches;
};

const parseQuestionCSV = async () => {
  const csv_data = await readFile(
    path.join(__dirname, "../../dataSheets/questions.csv"),
    "utf-8"
  );
  const [, ...data_rows] = csv_data.split(/\r?\n/);
  const data = [data_rows[23], data_rows[24], data_rows[25]];
  const parsedCsv = data.map((data_row) => {
    const data_row_data = data_row.splitCSV().filter((value) => !!value);

    const value = { questionNumber: parseInt(data_row_data[0]) };
    const annotations = [];
    for (let index = 1; index < data_row_data.length; index++)
      annotations.push(data_row_data[index]);
    value.annotations = annotations;
    return value;
  });

  return parsedCsv;
};

const parseTopicCSV = async () => {
  const csv_data = await readFile(
    path.join(__dirname, "../../dataSheets/topics.csv"),
    "utf-8"
  );
  const [, ...data_rows] = csv_data.split(/\r?\n/);

  const parsedCsv = data_rows.map((data_row) => {
    const data_row_data = data_row.splitCSV().filter((value) => !!value);
    const value = { questionNumber: parseInt(data_row_data[0]) };
    const annotations = [];
    for (let index = 1; index < data_row_data.length; index++)
      annotations.push(data_row_data[index]);
    value.annotations = annotations;
    return value;
  });

  return parsedCsv;
};

module.exports = {
  parseQuestionCSV,
  parseTopicCSV,
};
