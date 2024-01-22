// const express = require("express")
// const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand, ListObjectsCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3")
// const dotenv = require("dotenv")
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand, ListObjectsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"
import dotenv from "dotenv"
import express from "express"
dotenv.config();

const credentials = {
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
};
  

const s3Config = {
  region: process.env.AWS_REGION,
  credentials,
};
  
const s3 = new S3Client(s3Config);

const command = new ListObjectsV2Command({
  Bucket: process.env.BUCKET_NAME,
});
async function hey(){
  try {
    const { Contents } = await s3.send(command);
    const items = Contents.map((item) => {
        const fileName = item.Key.split('/').pop();
        // Remove the file extension by splitting the file name using '.' and taking the first part
        const nameWithoutExtension = fileName.split('.')[0];
  
        return nameWithoutExtension;
    })
    console.log(items);
  
  } catch (err) {
    console.error(err);
  }

}
hey()