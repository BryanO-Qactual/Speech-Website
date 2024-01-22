import { S3Client, PutObjectCommand, DeleteObjectCommand, ListBucketsCommand, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"
import dotenv from "dotenv"
import express from "express"
dotenv.config();
import cors from "cors"

const port = 8000
const app = express()
app.use(cors());
app.use(express.json());

const credentials = {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
};

const s3Config = {
    region: process.env.AWS_REGION,
    credentials,
};

const s3 = new S3Client(s3Config);

const command = new ListBucketsCommand({});

//SECTION - Get all speeches
app.get("/getSpeechList", async (req, res) => {
    const command = new ListObjectsV2Command({
        Bucket: process.env.BUCKET_NAME,
    });

    try {
        const { Contents } = await s3.send(command);;
        if(Contents){
            const items = Contents.map((item) => {
                const fileName = item.Key.split('/').pop();
                // Remove the file extension by splitting the file name using '.' and taking the first part
                const nameWithoutExtension = fileName.split('.')[0];
    
                return nameWithoutExtension;
            })
            res.send(items)
        }else{
            res.send([])
        }

    } catch (err) {
        console.error(err);
    }
 
})
//SECTION - Get specific speech
app.get("/speech/getSpeech/:fileName", async (req, res) => {
    const fileName = req.params.fileName;
    try {
        // SECTION - Locates specific file
        const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: `test/${fileName}.json`
        });
        const response = await s3.send(command);
        const speechContent = await response.Body.transformToString();
        res.send(speechContent)
    } catch (err) {
        console.error(err);
    }
})
// SECTION - Creates new speech
app.post("/createSpeech/:fileName", async (req, res)=>{
    const fileName = req.params.fileName;
    const content = req.body.content;
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
        res.status(200).json({ success: true, message: 'Request processed successfully'});
    }catch(err){
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})
//SECTION - Upadtes speech
app.delete("/updateSpeech/:fileName/:content", async (req, res) => {
    const fileName = req.params.fileName;
    const content = req.params.content;
    const formattedFileName = fileName.replace(/ /g, '_');

    // SECTION - Delete the same named speech
    

    // SECTION - Add the previously deleted speech with new content
    const uploadParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: `test/${formattedFileName}.json`,
        Body: JSON.stringify(content),
        ContentType: "application/json",
    };
    const uploadCommand = new PutObjectCommand(uploadParams);
    s3.send(uploadCommand);
})
//SECTION - Deletes speech
app.delete("/deleteSpeech/:fileName", async (req, res) => {
    const fileName = req.params.fileName;
    try {
        const deleteParams = {
            Bucket: process.env.BUCKET_NAME,
            Key:`test/${fileName}.json`,
        }
        const deleteCommand = new DeleteObjectCommand(deleteParams);
        s3.send(deleteCommand);
        res.status(200).json({ success: true, message: 'Request processed successfully'});
    } catch (err) {
        console.error(err);
    }
})

app.listen(port, () => {
    console.log("listening on port:", port);
})