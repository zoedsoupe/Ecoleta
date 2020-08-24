import path from "path";
import { Storage } from "@google-cloud/storage";

const serviceKey = path.join(__dirname, "keys.json");

const projectId = process.env.PROJECT_ID || "bethehero-matts";

export const storage = new Storage({
  keyFilename: serviceKey,
  projectId: projectId,
});
