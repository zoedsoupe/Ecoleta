import crypto from "crypto";
import { format } from "util";
import { storage } from "../config/upload";

export const saveFile = (file: Express.Multer.File): Promise<string> => {
  const bucketName = process.env.BUCKET || "ecoleta";
  const bucket = storage.bucket(bucketName);

  const uploadPromise = new Promise<string>((resolve, reject) => {
    if (!file) reject(new Error("No file specified!"));

    const { originalname, buffer } = file;

    const hash = crypto.randomBytes(6).toString("hex");

    const parsedFileName = originalname.replace(/ /g, "_");

    const newFileName = `${hash}-${parsedFileName}`;

    const blob = bucket.file(newFileName);

    const blobStream = blob.createWriteStream({ resumable: false });

    blobStream
      .on("finish", () => {
        const publicURL = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicURL);
      })
      .on("error", () =>
        reject(new Error("Unable to upload image, something went wrong"))
      )
      .end(buffer);
  });

  return uploadPromise;
};
