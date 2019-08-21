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

// Max height and width of the thumbnail in pixels.
const THUMB_MAX_WIDTH = 384;

const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);

exports.thumbnail = functions.storage
  .bucket(adminConfig.storageBucket)
  .object()
  .onFinalize(object => {
    const fileBucket = object.bucket; // The Storage bucket that contains the file.
    const filePathInBucket = object.name;
    const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exists' (for file/folder deletions).
    const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
    const contentType = object.contentType; // This is the image MIME type
    const isImage = contentType.startsWith("image/");
    const isVideo = contentType.startsWith("video/");

    // Exit if this is a move or deletion event.
    if (resourceState === "not_exists") {
      return Promise.resolve();
    }
    // Exit if file exists but is not new and is only being triggered
    // because of a metadata change.
    else if (resourceState === "exists" && metageneration > 1) {
      return Promise.resolve();
    }
    // Exit if the image is already a thumbnail.
    else if (filePathInBucket.indexOf(".thumbnail.") !== -1) {
      return Promise.resolve();
    }
    // Exit if this is triggered on a file that is not an image or video.
    else if (!(isImage || isVideo)) {
      return Promise.resolve();
    }

    const fileDir = path.dirname(filePathInBucket);
    const fileName = path.basename(filePathInBucket);
    const fileInfo = path.parse(fileName);
    const thumbFileExt = isVideo ? "jpg" : fileInfo.ext;
    let thumbFilePath = path.normalize(
      path.join(fileDir, `${fileInfo.name}.thumbnail.${thumbFileExt}`)
    );

    console.log(thumbFilePath);

    const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);
    const tempLocalDir = path.join(os.tmpdir(), fileDir);
    const generateOperation = isVideo ? generateFromVideo : generateFromImage;

    // Cloud Storage files.
    const bucket = new Storage({
      projectId: "fir-demo-5413c"
    }).bucket(fileBucket);
    const file = bucket.file(filePathInBucket);

    const metadata = {
      contentType: isVideo ? "image/jpeg" : contentType
      // To enable Client-side caching you can set the Cache-Control headers here. Uncomment below.
      // 'Cache-Control': 'public,max-age=3600',
    };

    // Create the temp directory where the storage file will be downloaded.
    return mkdirp(tempLocalDir)
      .then(() => {
        return generateOperation(file, tempLocalThumbFile, fileName);
      })
      .then(() => {
        console.info("Thumbnail created at", tempLocalThumbFile);
        // Get the thumbnail dimensions
        return spawn(
          "identify",
          ["-ping", "-format", "%wx%h", tempLocalThumbFile],
          { capture: ["stdout", "stderr"] }
        );
      })
      .then(result => {
        const dim = result.stdout.toString();
        const idx = thumbFilePath.indexOf(".");

        thumbFilePath = `${thumbFilePath.substring(
          0,
          idx
        )}_${dim}${thumbFilePath.substring(idx)}`;
        console.info("Thumbnail dimensions:", dim);
        // Uploading the Thumbnail.
        return bucket.upload(tempLocalThumbFile, {
          destination: thumbFilePath,
          metadata: metadata
        });
      })
      .then(() => {
        console.info("Thumbnail uploaded to Storage at", thumbFilePath);

        const thumbFilename = path.basename(thumbFilePath);

        // return updateDatabase(fileDir, fileName, thumbFilename);
        return Promise.resolve();
      })
      .then(() => {
        console.info("Thumbnail generated.");

        // delete the temp file
        fs.unlinkSync(tempLocalThumbFile);

        return Promise.resolve();
      });
  });

function generateFromVideo(file, tempLocalThumbFile) {
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
        tempLocalThumbFile
      ]);
      return promise;
    });
}
