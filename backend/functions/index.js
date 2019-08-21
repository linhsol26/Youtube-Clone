const functions = require("firebase-functions");

const mkdirp = require("mkdirp-promise");
const { Storage } = require("@google-cloud/storage");
const admin = require("firebase-admin");
const spawn = require("child-process-promise").spawn;
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const path = require("path");
const os = require("os");
const fs = require("fs");

admin.initializeApp();
const db = admin.firestore();

const THUMB_MAX_WIDTH = 400;

exports.genThumb = functions.https.onCall(data => {
  const vid = data.vid;

  const videoPath = "/videos/" + vid;
  const thumbPath = videoPath + ".gen";

  const bucket = new Storage({
    projectId: "fir-demo-5413c"
  }).bucket("fir-demo-5413c.appspot.com");

  const video = bucket.file(videoPath);
  const metadata = {
    contentType: "image/jpeg",
    "Cache-Control": "public,max-age=3600"
  };

  const tempThumbPath = path.join(os.tmpdir(), thumbPath);
  const tempDir = path.join(os.tmpdir(), "/videos");

  console.log(tempThumbPath, tempDir);

  return mkdirp(tempDir)
    .then(() => {
      return generateFromVideo(video, tempThumbPath);
    })
    .then(() => {
      return spawn("identify", ["-ping", "-format", "%wx%h", tempThumbPath], {
        capture: ["stdout", "stderr"]
      });
    })
    .then(() => {
      return bucket.upload(tempThumbPath, {
        destination: thumbPath,
        metadata: metadata
      });
    })
    .then(() => {
      const thumb = bucket.file(thumbPath);
      return thumb.getSignedUrl({ action: "read", expires: "05-24-2999" });
    })
    .then(urls => {
      fs.unlinkSync(tempThumbPath);
      console.log(urls[0]);
      return Promise.resolve(urls[0]);
    });
});

function generateFromVideo(file, tempThumbPath) {
  return file
    .getSignedUrl({ action: "read", expires: "05-24-2999" })
    .then(signedUrl => {
      const fileUrl = signedUrl[0];

      const promise = spawn(ffmpegPath, [
        "-ss",
        "0",
        "-i",
        fileUrl,
        "-f",
        "image2",
        "-vframes",
        "1",
        "-vf",
        `scale=${THUMB_MAX_WIDTH}:-1`,
        tempThumbPath
      ]);
      return promise;
    });
}
