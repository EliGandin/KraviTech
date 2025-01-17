import { DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

import { s3, s3Uri } from "./s3.config";

const bucket = process.env.AWS_BUCKET_NAME;

export const putImage = async (file: Express.Multer.File, imageName: string) => {
  try {
    const buffer = await sharp(file.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();

    const params = {
      Bucket: bucket as string,
      Key: imageName,
      Body: buffer,
      ContentType: file.mimetype,
    };
    const command = new PutObjectCommand(params);
    const response = await s3.send(command);
    if (!response.ETag) {
      throw new Error(`Upload image failed. Try again.`);
    }

    return true;
  } catch (e) {
    const error = `Error uploading image: ${(e as Error).message}`;
    console.error(error);
    return false;
  }
};

export const getImageUrl = async (imageName: string) => {
  const params = {
    Bucket: bucket,
    Key: imageName,
  };

  const command = new GetObjectCommand(params);
  const response = await s3.send(command);
  if (!response.ETag)
    return undefined;
  else {
    return `${process.env.AWS_ENDPOINT_URL}/${bucket}/${imageName}`.replace("s3-local", s3Uri);
  }
};

export const deleteImage = async (imageName: string) => {
  const deleteParams = {
    Bucket: bucket,
    Key: imageName,
  };

  return s3.send(new DeleteObjectCommand(deleteParams));
};

export const listBucket = async () => {
  const input = {
    Bucket: bucket,
  };

  const command = new ListObjectsV2Command(input);
  const response = await s3.send(command);
  console.log(response.Contents);
  return response;
};