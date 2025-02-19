const { s3, params } = require("../config/s3");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const db = require("../config/db");
const fs = require('fs');


module.exports = {

    createMedia: async (req, res, next) => {
        // console.log("Inside of createMedia middleware.");
        const mediaExists = !!req.file;
        const postCreated = res.locals.postCreated;
    
        if (!mediaExists || !postCreated || !postCreated.success) {
            console.log("No media to upload or post creation failed.");
            res.locals.mediaCreated = {
                message: "No media to upload or post creation failed.",
                success: false
            };
            return res.json(res.locals.mediaCreated); 
        }
        const postId = postCreated.postId;
        // console.log("This is the req.file = ", req.file);
        // console.log("this is the req.file.path = ", req.file.path);
        // console.log("this is the req.file.name = ", req.file.filename);

        try {
            const fileContent = fs.readFileSync(req.file.path);
            const fileName = req.file.filename;
            let mediaType = 'picture'; 
            let contentType;

            if (mediaType === 'picture') {
                contentType = 'image/jpeg';
            } else if (mediaType === 'video') {
                contentType = 'video/mp4';
            } 
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET,
                Key: `myPictures/${fileName}`,
                Body: fileContent,
                ContentType: contentType
            };
    
            const s3Response = await s3.upload(uploadParams).promise();
            const mediaUrl = s3Response.Location;

            let mediaSql;

            if (mediaType === 'picture') {
                mediaSql = `
                    INSERT INTO csc648db.Picture (PostID, S3_PATH, FileName, UploadDate)
                    VALUES (?, ?, ?, CURDATE());
                `;
            } else if (mediaType === 'video') {
                mediaSql = `
                    INSERT INTO csc648db.Video (PostID, S3_PATH, UploadDate)
                    VALUES (?, ?, CURDATE());
                `;
            }
            await db.query(mediaSql, [postId, mediaUrl, fileName]);

            res.locals.mediaCreated = {
                message: "Media uploaded successfully.",
                success: true,
                mediaUrl: mediaUrl
            };
            next();
        } catch (uploadError) {
            res.locals.mediaCreated = {
                message: "Error uploading media",
                success: false,
            };
            return res.json(res.locals.mediaCreated); 
        }
    },
    
    
    

    fetchMedia: async (req, res, next) => {
        if (!res.locals.postFound) {
            return next(); // Skip fetching media if no posts are found
        }
    
        const posts = res.locals.posts;
    
        try {
            for (let post of posts) {
                // Fetch pictures associated with the post
                const picturesSql = `SELECT PictureID, S3_PATH FROM Picture WHERE PostID = ?;`;
                const [pictures] = await db.query(picturesSql, [post.PostID]);
                if (pictures.length > 0) {
                    post.pictureS3Path = pictures[0].S3_PATH;
                    post.pictureId = pictures[0].PictureID;
                } else {
                    post.pictureS3Path = null;
                    post.pictureId = null;
                }
    
                // Fetch videos associated with the post
                const videosSql = `SELECT VideoID, S3_PATH FROM Video WHERE PostID = ?;`;
                const [videos] = await db.query(videosSql, [post.PostID]);
                if (videos.length > 0) {
                    post.videoS3Path = videos[0].S3_PATH;
                    post.videoId = videos[0].VideoID;
                } else {
                    post.videoS3Path = null;
                    post.videoId = null;
                }
            }
    
            res.locals.posts = posts; // Update posts with attached media
            next();
        } catch (error) {
            console.error("Error in fetchMedia middleware: ", error);
            next(); // Proceed even if there's an issue fetching media
        }
    },
    
    // questionable, because i dont think this will ever be deleted off of the bucket. 
    // maybe instead we can just have it to where it would just remove it from the post 
    deleteMedia: (req, res, next) => {
        
    }
    
};

