const fs = require("fs");
const path = require("path");
const { Command } = require("commander");

const readdir = require("util").promisify(fs.readdir);
const connect = require("../");

const program = new Command();
program.version("0.8.0");

const initializeSeeders = async () => {
  const seedersPath = path.resolve(__dirname);
  try {
    const files = await readdir(seedersPath);
    const seeders = [];
    files
      .filter((fileName) => fileName.match(/\.(seeder.js)$/i))
      .forEach((fileName) => {
        console.log({ fileName });
        const seeder = require(path.resolve(__dirname, fileName));
        seeders[seeder.order] = seeder;
      });
    return seeders;
  } catch (err) {
    throw err;
  }
};

program.name("seed").usage("Seed database resources.");

program.parse(process.argv);

const connection = connect();

connection.on("error", console.error).on("open", async () => {
  try {
    const seeders = await initializeSeeders();

    if (seeders.length) {
      let success = true;
      const failedSeeders = [];
      const formatFailedSeeders = () =>
        failedSeeders.reduce((formattedString, failedSeeder) => {
          if (failedSeeders.length === 1) return failedSeeder;
          failedSeeders.indexOf(failedSeeder) === failedSeeders.length - 1
            ? (formattedString += `and ${failedSeeder}`)
            : (formattedString += `${failedSeeder}, `);
          return formattedString;
        }, "");

      console.log("🌱 Seeding database...");
      seeders
        .reduce((promises, seeder) => {
          const { name } = seeder;
          return promises.then(() => {
            return seeder
              .seed()
              .then((results) => {
                if (results) {
                  console.log(
                    `✅ Finished seeding ${
                      name.endsWith("s") ? name : name + "s"
                    }`
                  );
                }
              })
              .catch((err) => {
                success = false;
                failedSeeders.push(
                  name.endsWith("s") ? name.slice(0, -1) : name
                );
                if (typeof err === "string") console.log(`❌ ${err}`);
                else console.log(err);
              });
          });
        }, Promise.resolve())
        .then(() => {
          if (success) console.log("✅ Seeding successful");
          else
            console.log(
              failedSeeders.length === seeders.length
                ? "🟠 All seeders have failed"
                : `🟠 The ${formatFailedSeeders()} seeder${
                    failedSeeders.length > 1 ? "s have" : " has"
                  } failed`
            );
        })
        .finally(() => {
          connection.close();
        });
    } else {
      console.log("🔴 No database seeders found");
      connection.close();
    }
  } catch (err) {
    console.log(err);
  }
});
