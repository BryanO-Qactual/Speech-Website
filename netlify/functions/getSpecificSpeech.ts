import { Config, Context } from "@netlify/functions";
import { S3Client, PutObjectCommand, DeleteObjectCommand, ListBucketsCommand, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"
import dotenv from "dotenv"
dotenv.config();
const credentials = {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
};

const s3Config:object = {
    region: process.env.AWS_REGION,
    credentials,
};

const s3 = new S3Client(s3Config);

const command = new ListBucketsCommand({});
export default async (req: Request, context: Context) => {

    const fileName = context.params.fileName;
    try {
        // SECTION - Locates specific file
        const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: `test/${fileName}.json`
        });
        const response = await s3.send(command);
        const speechContent = await response.Body?.transformToString();
        return speechContent
    } catch (err) {
        console.error(err);
    }
 
};

export const config: Config = {
  path: "/speech/getSpeech/:fileName"
};