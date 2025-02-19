const AWS = require('aws-sdk');
require("dotenv").config();

const s3 = new AWS.S3();


const params = {
    Bucket: process.env.AWS_BUCKET
};

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});


module.exports = {
    s3: s3,
    params: params // will hold the configuration details for the S3 bucket

};