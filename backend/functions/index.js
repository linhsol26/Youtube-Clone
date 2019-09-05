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
    .then((data) => {
      const thumb = bucket.file(thumbPath);
      return thumb.getSignedUrl({ action: "read", expires: "05-24-2999" });
      // urls from getSignedURL lasts only maximum 7 days 
      // https://stackoverflow.com/questions/42956250/get-download-url-from-file-uploaded-with-cloud-functions-for-firebase
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

exports.updatePublicVideo = functions.firestore
  .document("videos/{vid}")
  .onUpdate(async change => {
    const info = change.after.data();

    if (info["privacy"] === "public") {
      const user = await db
        .doc(`users/${info["uid"]}`)
        .get()
        .then(doc => doc.data());

      const data = {
        vid: info["vid"],
        owner: user["name"],
        title: info["title"],
        thumbnailURL: info["thumbnailURL"],
        views: info["views"],
        timestamp: info["timestamp"]
      };

      return db.doc(`public/${data.vid}`).set(data);
    } else if (info["privacy"] === "private") {
      db.doc(`public/${info["vid"]}`).delete();
    }
    return Promise.resolve();
  });
