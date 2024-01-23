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
    const content = req.body //needs to look into

    // console.log(content)
    try{
        const uploadParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: `test/${fileName}.json`,
            Body: JSON.stringify(content),
            ContentType: "application/json",
        };
        const uploadCommand = new PutObjectCommand(uploadParams);
        s3.send(uploadCommand);
        return ({ success: true, message: 'Request processed successfully'});
    }catch(err){
        return ({ success: false, message: 'Internal Server Error' });
    }
};

export const config: Config = {
  path: "/createSpeech/:fileName"
};