const fs = require("fs");
const readline = require("readline");
const readFile = require("util").promisify(fs.readFile);
const writeFile = require("util").promisify(fs.writeFile);
const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const TOKEN_PATH = "token.json";

function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, async (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      try {
        await writeFile(JSON.stringify(token));
        console.log("Token stored to", TOKEN_PATH);
      } catch (err) {
        return console.error(err);
      }
      return oAuth2Client;
    });
  });
}

const authorize = async () => {
  try {
    const credentialsContent = await readFile("credentials.json", "utf-8");
    const credentials = JSON.parse(credentialsContent);
    console.log(credentials);
    const { client_secret, client_id, redirect_uris } = credentials;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    try {
      const token = await readFile(TOKEN_PATH);
      oAuth2Client.setCredentials(JSON.parse(token));
      return oAuth2Client;
    } catch (err) {
      return getAccessToken(oAuth2Client);
    }
  } catch (err) {
    console.log(err);
    throw Error("authentication failed");
  }
};

const getGoogleSheetData = async (spreadsheetId, sheetName) => {
  try {
    const authClient = await authorize();
    const request = {
      spreadsheetId,
      range: `${sheetName}!A:F`,
      // auth: authClient,
    };
    console.log(authClient);
    const sheets = google.sheets({ version: "v4", auth: authClient });
    const response = await sheets.spreadsheets.values.get(request);
    console.log(response);
    // console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    throw err;
  }
};

// module.exports = { getGoogleSheetData };
const id = "1Ti55VxyW5MAWG8B9zNf6kynVdMXTY_W9ZyHzTB5VqmE";
const q = "Questions";
const t = "";
getGoogleSheetData(id, q);
