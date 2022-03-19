const {
  modelsName: { TOPICS },
} = require("../../utils");

async function bulkyImportTopics(topics) {
  const Topics = this.model(TOPICS);

  try {
    const bulkyImportedDocuments = await Promise.all(
      topics.map((topic) => {
        const newTopic = new Topics({
          _id: topic._id,
          path: topic.path,
        });
        return newTopic.createTopics();
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

async function getTopics(topic) {
  const Topics = this.model(TOPICS);

  if (!topic || typeof topic !== "string") return [];

  let queryTopic = `,${topic},`;
  if (topic.includes(",")) queryTopic = `,'${topic}',`;

  try {
    const subTopicQuestion = await Topics.aggregate([
      { $match: { path: { $regex: queryTopic, $options: "i" } } },
      { $project: { path: 0 } },
      {
        $lookup: {
          from: "questions",
          let: { topic: "$_id" },
          pipeline: [
            { $match: { $expr: { $in: ["$$topic", "$annotations"] } } },
            { $project: { annotations: 0 } },
          ],
          as: "question",
        },
      },
      { $match: { $expr: { $gte: [{ $size: "$question" }, 1] } } },
      { $unwind: { path: "$question" } },
      { $group: { _id: "$question._id" } },
      { $sort: { _id: 1 } },
      { $group: { _id: null, questions: { $push: "$_id" } } },
      { $project: { _id: 0 } },
    ]);
    console.log({ subTopicQuestion });
    if (subTopicQuestion.length) {
      const { questions } = subTopicQuestion[0];
      return questions || [];
    }

    return [];
  } catch (err) {
    throw {
      message: err.message || "An error occured while getting topics",
      status: err.status || 500,
    };
  }
}

module.exports = {
  getTopics,
  bulkyImportTopics,
};

// db.categories.insert({ _id: "Books", path: null });
// db.categories.insert({ _id: "Programming", path: ",Books," });
// db.categories.insert({ _id: "Databases", path: ",Books,Programming," });
// db.categories.insert({ _id: "Languages", path: ",Books,Programming," });
// db.categories.insert({ _id: "MongoDB", path: ",Books,Programming,Databases," });
// db.categories.insert({ _id: "dbm", path: ",Books,Programming,Databases," });

// db.questions.insertMany([
//   { _id: 1, annotations: ["dbm", "MongoDB"] },
//   { _id: 2, annotations: ["Books"] },
//   { _id: 3, annotations: ["dbm", "MongoDB", "Databases"] },
//   { _id: 4, annotations: ["dbm"] },
//   { _id: 5, annotations: ["dbm", "Books"] },
//   { _id: 6, annotations: ["Languages", "MongoDB"] },
//   { _id: 7, annotations: [] },
//   { _id: 8, annotations: ["Books,Programming"] },
//   { _id: 9, annotations: ["Programming", "Databases"] },
// ]);

// db.topics.insertMany([
//   { _id: "Books", path: null },
//   { _id: "Programming", path: ",Books," },
//   { _id: "Databases", path: ",Books,Programming," },
//   { _id: "Languages", path: ",Books,Programming," },
//   { _id: "MongoDB", path: ",Books,Programming,Databases," },
//   { _id: "dbm", path: ",Books,Programming,Databases," },
// ]);

// db.topics
//   .aggregate([
//     { $match: { path: /,Programming,/ } },
//     { $group: { _id: null, subTreeTopics: { $push: "$_id" } } },
//     { $project: { _id: 0 } },
//     {
//       from: "questions",
//       let: { topics: "$subTreeTopics" },
//       pipeline: [
//         {
//           $addFields: {
//             descendantTopic: "$$topic",
//           },
//         },
//         {
//           $match: {
//             // $expr: {
//             annotations: { $elemMatch: { $in: "$descendantTopic" } },
//             // },
//           },
//         },
//         {
//           $project: { annotations: 0 },
//         },
//       ],
//       as: "questions",
//     },
//     {
//       $lookup: {
//         from: "questions",
//         let: { subTreeTopics: "$subTreeTopics" },
//         pipeline: [
//           {
//             $match: {
//               annotations: { $elemMatch: { $in: "$$subTreeTopics" } },
//             },
//           },
//           {
//             $project: { annotations: 0 },
//           },
//         ],
//         as: "questions"
//       },
//     },
//   ])
//   .pretty();
