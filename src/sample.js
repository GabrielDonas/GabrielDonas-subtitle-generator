"use strict";

const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const { authenticate } = require("@google-cloud/local-auth");

// initialize the Youtube API library
const youtube = google.youtube("v3");

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
    videoId: "Hb75upkbzq8",
  });
  console.log("Checking ID"); //delete please
  const captionTrack = res.data.items[0];

  //if captions aren't available yet, run the code again.
  const findCaptionTrack = (captions) => {
    if (!captions) {
      console.log("Captions are still being generated.");
      setTimeout(() => {
        findCaptionTrack(captions);
      }, 30000);
    }
  };

  findCaptionTrack(captionTrack);

  const downloadCaptions = await youtube.captions.download({
    id: captionTrack.id,
    tfmt: "srt",
  });

  console.log("Downloading subs:"); //delete please
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
