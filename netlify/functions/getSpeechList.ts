import { Config, Context } from "@netlify/functions";
import { S3Client, ListBucketsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"
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
    
 const command = new ListObjectsV2Command({
        Bucket: process.env.BUCKET_NAME,
    });

    try {
        const { Contents } = await s3.send(command);;
        if(Contents){
            const items = Contents.map((item) => {
                const fileName = item.Key?.split('/').pop();
                const nameWithoutExtension = fileName?.split('.')[0];
    
                return nameWithoutExtension;
            })
            return items
        }else{
            return []
        }

    } catch (err) {
        console.error(err);
    }
 
};

export const config: Config = {
  path: "/getSpeechList"
};