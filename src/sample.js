"use strict";

const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const { authenticate } = require("@google-cloud/local-auth");

// initialize the Youtube API library
const youtube = google.youtube("v3");

// a very simple example of searching for youtube videos
async function runSample() {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "../oauth2.keys.json"),
    scopes: [
      "https://www.googleapis.com/auth/youtubepartner",
      "https://www.googleapis.com/auth/youtube.force-ssl",
    ],
  });
  google.options({ auth });

  const res = await youtube.captions.list({
    part: "id,snippet",
    videoId: "PN8kS1YXoxk",
  });
  console.log("Check ID"); //delete please
  console.log(res.data);

  const downloadCaptions = await youtube.captions.download({
    id: res.data.items[0].id,
    tfmt: "srt",
  });
  console.log("Download subs"); //delete please
  console.log(downloadCaptions.data); //delete please

  fs.writeFile("captions.srt", downloadCaptions.data, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}

if (module === require.main) {
  runSample().catch(console.error);
}
module.exports = runSample;
