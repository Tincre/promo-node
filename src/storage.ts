import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { generateFilePath } from './utils';
/**
 * uploadMedia
 * @description Upload a file to AWS S3 given a backend route and the file.
 * The server at the given `backendRoute` should return a pre-signed URL for uploading the file and
 * one for reading the file.
 *
 */
export async function uploadMedia(backendRoute: string, file: File) {
  try {
    const res = await fetch(`${backendRoute}/api/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      }),
    });

    const { putUrl, getUrl } = await res.json();

    const uploadResponse = await fetch(putUrl, {
      body: file,
      method: 'PUT',
      headers: { 'Content-Type': file.type },
    });

    return { status: uploadResponse.ok, uploadedUrl: getUrl };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export type S3Credentials = {
  accessKeyId: string;
  secretAccessKey: string;
};

/**
 * getS3Client
 * @description Get the client instance of the AWS S3 service.
 */
export function getS3Client(region: string, credentials: S3Credentials) {
  return new S3Client({
    region: region,
    credentials: credentials,
  });
}

/**
 * getS3PutUrl
 * @description Given the bucket base, Promo ID and file object, return a pre-signed URL for uploading the file.
 */
export async function getS3PutUrl(
  bucketName: string,
  pid: string,
  file: File,
  client: S3Client,
  expiresInSeconds?: number
) {
  const awsPath = generateFilePath(file, pid);
  const putCommand = new PutObjectCommand({
    Key: awsPath,
    ContentType: file.type,
    Bucket: bucketName,
  });
  const signedPutUrl = await getSignedUrl(client, putCommand, {
    expiresIn: expiresInSeconds || 600,
  });
  return { putUrl: signedPutUrl, awsPath };
}

/**
 * getS3ReadUrl
 * @description Given the awsPath and S3Client, return a pre-signed URL for reading the file.
 */
export async function getS3ReadUrl(
  awsPath: string,
  client: S3Client,
  expiresInSeconds?: number
) {
  let key = awsPath.split('/').slice(3).join('/');
  let bucket = awsPath.split('/').slice(2, 3).join();
  const getCommand = new GetObjectCommand({
    Key: key,
    Bucket: bucket,
  });
  // Generate pre-signed URL for GET request
  const signedGetUrl = await getSignedUrl(client, getCommand, {
    expiresIn: expiresInSeconds || 600,
  });
  return { getUrl: signedGetUrl };
}
