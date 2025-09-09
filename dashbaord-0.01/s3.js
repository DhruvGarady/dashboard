// s3.js
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// overwrite logic: pass userId to ensure same key each time
async function uploadToS3(file, userId) {
  // always same file name for the user → overwrites old picture
  const fileName = `profile_pics/user_${userId}${getExtension(file.mimetype)}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3.send(command);

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}

// helper: get extension from mimetype
function getExtension(mimetype) {
  switch (mimetype) {
    case "image/jpeg": return ".jpg";
    case "image/png": return ".png";
    default: return "";
  }
}

module.exports = { uploadToS3 };
