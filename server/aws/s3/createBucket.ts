import * as dotenv from "dotenv";
import { CreateBucketCommand } from "@aws-sdk/client-s3";

import { s3 } from "./s3.config";

dotenv.config();

const createBucket = async () => {
  const bucket = process.env.AWS_BUCKET_NAME as string;

  try {
    const command = new CreateBucketCommand({ Bucket: bucket });
    await s3.send(command);
    console.log(`Bucket "${bucket}" created successfully.`);
  } catch (error) {
    if (error.name === "BucketAlreadyOwnedByYou") {
      console.log(`Bucket "${bucket}" already exists.`);
    } else {
      console.error("Error creating bucket:", error);
    }
  }
};