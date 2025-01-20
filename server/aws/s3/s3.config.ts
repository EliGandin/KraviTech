import {
  S3Client,
} from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";

dotenv.config();

export const s3 = new S3Client({
  region: process.env.AWS_DEFAULT_REGION as string,
  endpoint: process.env.AWS_ENDPOINT_URL as string,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const s3Uri = () => {
  if ("AWS_ENDPOINT_URL" in process.env) // if working locally with localstack
    return "localhost";
  return "s3.amazonaws.com";
};