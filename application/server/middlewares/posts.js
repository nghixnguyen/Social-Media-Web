const db = require("../config/db");
const auth = require('../middlewares/auth');
const multimediaMiddleware = require('../middlewares/multimedia');
const { s3, params } = require("../config/s3");
const multer = require('multer');
const fs = require('fs');
//const { post } = require("../routes/posts");

require("dotenv").config();


module.exports = {

    // fetching a post with specific PostID
    fetchSinglePost: (req, res, next) => {
            const { postId } = req.params;
    
            const sql = `
                SELECT * FROM csc648db.Post
                WHERE PostID = ?;
            `;
    
            db.query(sql, [postId])
                .then(([post]) => {
                    if (post.length === 0) {
                        res.locals.postFound = false; // Setting flag to false since the post was not found at the specified postId
                        res.locals.message = "Post not found."; // Setting the message to reflect that 
                        return res.json(res.locals);  // Returning the entire res to the route 
                    } else {
                        res.locals.post = post[0];  // Store the post in res.locals
                        res.locals.postFound = true;  
                        next();  // Go to the next middleware/route handler 
                    }
                })
                .catch(error => {
                    res.locals.postFound = false;  
                    res.locals.message = "An error occurred while fetching the post."; 
                    return res.json(res.locals); 
                });
    },
    
    // fetching all posts from a specific User
    fetchUserPostsByUserId: async (req, res, next) => {
        // console.log("Running fetchUserPosts");
        const { userId } = req.params;
    
        const sql = `
            SELECT * FROM csc648db.Post
            WHERE AuthorID = ?
            ORDER BY CreatedDate ASC;
        `;
    
        try {
            const [posts] = await db.query(sql, [userId]);
    
            if (posts.length > 0) {
                res.locals.postFound = true;
                res.json(posts);  // directly send the posts if they are found
            } else {
                res.locals.postFound = false;
                res.locals.message = "No post found for this user.";
                return res.json(res.locals);
            }
            next();
        } catch (error) {
            res.locals.postFound = false;
            res.locals.message = "An error occurred while fetching all posts from a specific user.";
            return res.json(res.locals);
        }
    },
    // fetching all posts for loggedin User
    fetchUserPosts: async (req, res, next) => {
        // console.log("Running fetchUserPosts");
        //console.log(req.session.user);
        var  userId  = req.session.user.UserID;
        //console.log(userId);
    
        const sql = `
        SELECT
        P.*,
        RU.FirstName,
        RU.LastName
        FROM
            Post P
        JOIN
            RegisteredUser RU ON P.AuthorID = RU.UserID
        WHERE
            P.AuthorID = ?
        ORDER BY
            P.PostID DESC;
        `;
    
        try {
            const [posts] = await db.query(sql, [userId]);
    
            if (posts.length > 0) {
                res.locals.postFound = true;
                res.locals.posts = posts;
                // return res.json(posts);  // directly send the posts if they are found
                next();
            } else {
                res.locals.postFound = false;
                res.locals.message = "No post found for this user.";
                return res.json(res.locals);
            }
            
        } catch (error) {
            res.locals.postFound = false;
            res.locals.message = "An error occurred while fetching all posts from a specific user.";
            return res.json(res.locals);
        }
    },

    // fetching all posts
    fetchPosts: async (req, res, next) => {
        // console.log("Running fetchUserPosts");
        
    
        const sql = `
        SELECT
        P.*,
        RU.FirstName,
        RU.LastName
        FROM
        Post P
        JOIN
        RegisteredUser RU ON P.AuthorID = RU.UserID
        ORDER BY
        P.PostID DESC;
        `;
    
        try {
            const [posts] = await db.query(sql);
    
            if (posts.length > 0) {
                res.locals.postFound = true;
                res.locals.posts = posts;
                //return res.json(posts);  // directly send the posts if they are found
                next();
            } else {
                res.locals.postFound = false;
                res.locals.message = "No post found for this user.";
                return res.json(res.locals);
            }
            
        } catch (error) {
            res.locals.postFound = false;
            res.locals.message = "An error occurred while fetching all posts from a specific user.";
            return res.json(res.locals);
        }
    },

    createPost: async (req, res, next) => {
        console.log("Inside of createPost middleware.");
        const { authorId, postDescription } = req.body;
    
        // Check for missing required fields
        if (!authorId || !postDescription) {
            res.locals.postCreated = {
                message: "Author ID and post description are required",
                success: false,
            };
            return res.json(res.locals.postCreated);
        }
    
        try {
            const postSql = `
                INSERT INTO csc648db.Post (AuthorID, PostDescription, CreatedDate)
                VALUES (?, ?, CURDATE());
            `;
            const postResult = await db.query(postSql, [authorId, postDescription]);
            // console.log("This is the postResult = ", postResult);
            const insertId = postResult[0].insertId; // Accessing the insertId from the ResultSetHeader
            // console.log("This is the postResult InsertID = ", insertId);
            res.locals.postCreated = {
                postId: insertId,
                message: "Post created successfully.",
                success: true,
            };
            next();
        } catch (dbError) {
            res.locals.postCreated = {
                message: "Error creating post in the database",
                success: false,
                error: dbError,
            };
            return res.json(res.locals.postCreated);
        }
    },
    
    


    // createPost: async (req, res, next) => {
    //     console.log("Inside of createPost");
    //     console.log(req.file);
    //     const {  authorId, postDescription } = req.body;
        
    
    //     if (!authorId || !postDescription) {
    //         res.json.message = "Author ID and post description are required"
    //         res.json.createdPost = false;
    //         return res.json(res.locals);   
    //     }
    
    //     const mediaExists = !!req.file;
    //     let mediaType = null;
    //     let mediaUrl = '';
    
    //     if (mediaExists) {
    //         //mediaType = multimediaMiddleware.determineMediaType(req.file);
    //         mediatype = 'picture';
    //         mediaUrl = req.file.path;
    //     }
    
    //     try {
    //         const postSql = `
    //             INSERT INTO csc648db.Post (AuthorID, PostDescription, CreatedDate)
    //             VALUES (?, ?, CURDATE());
    //         `;
    //         const postResult = await db.query(postSql, [authorId, postDescription]);
    //         const postId = postResult.insertId;
    //         res.locals.postMessage = "Post created successfully.";    

    
    //         if (mediaExists) {
    //             const fileContent = fs.readFileSync(req.file.path);
    //             const fileName = req.file.filename;
    //             let contentType = '';
    
    //             if (mediaType === 'picture') {
    //                 // Assuming it's JPEG for now, adjust based on actual type
    //                 contentType = 'image/jpeg'; 
    //             } else if (mediaType === 'video') {
    //                 // Assuming it's MP4 for now, adjust based on actual type
    //                 contentType = 'video/mp4';
    //             }
    
    //             const params = {
    //                 Bucket: process.env.AWS_BUCKET,
    //                 Key: `myPictures/${req.file.filename}`,
    //                 Body: fileContent,
    //                 ContentType: contentType 
    //             };
    
    //             const s3Response = await s3.upload(params).promise();
    //             mediaUrl = s3Response.Location;
    
    //             if (mediaType === 'picture') {
    //                 const mediaSql = `
    //                     INSERT INTO csc648db.Picture (PostID, S3_PATH, FileName, UploadDate)
    //                     VALUES (LAST_INSERT_ID(), ?, ?, CURDATE());
    //                 `;
    //                 await db.query(mediaSql, [mediaUrl, fileName]);

    //             } else {
    //                 const mediaSql = `
    //                     INSERT INTO csc648db.Video (PostID, S3_PATH, UploadDate)
    //                     VALUES (?, ?, CURDATE());
    //                 `;
    //                 await db.query(mediaSql, [postId, mediaUrl]);
                    
    //             }
    //         }
    //         console.log("Right before the res.local messages: ");
    //         res.locals.mediaUploaded = true; 
    //         res.locals.mediaMessage = "Media created successfully.";    
    //         res.locals.mediaUploaded = mediaExists;
    //         res.locals.mediaUrl = mediaUrl;
    //         next(); // next after success
    //     } catch (dbError) {
    //         res.locals.message = "Error creating post in the database"
    //         res.locals.mediaUploaded = false;
    //         return res.json(res.locals);

    //     }
    // },
    
    fetchUserPostsWithMedia: (req, res, next) => {
        
    },

    // might need to change it based on islogged in, and checking if that userID matches the db query
    // should not be able to change pictures after they post, only edit the post description 
    // this idea is similar to instagram
    editPost: async (req, res, next) => {
        const { postId, postDescription } = req.body;
    
        if (!postId || !postDescription) {
            res.locals.editedPost = false; 
            res.locals.message = "Error with postId or postDescription"; 
            return res.json(res.locals);  
        }
    
        const sql = `
            UPDATE csc648db.Post
            SET PostDescription = ?, EditDate = NOW()
            WHERE PostID = ?;
        `;
    
        try {
            const [result] = await db.query(sql, [postDescription, postId]);
            if (result.affectedRows === 0) { 
                res.locals.editedPost = false; 
                res.locals.message = "No post found with the provided postId."; 
                return res.json(res.locals);  
            } else {
                res.locals.editedPost = true; 
                res.locals.message = "Edit post successfully"; 
                next();
            }
        } catch (error) {
            res.locals.editedPost = false; 
            res.locals.message = "Error with query in edit post"; 
            return res.json(res.locals);  
        }
    },
    
    
    deletePost: async (req, res, next) => {
        const userId = req.params.userId;  // Extract userId from URL
        const { postId } = req.body;  // Extract postId from request body
    
        // Validate userId and postId
        if (!userId || !postId) {
            res.locals.message = "Both userId and postId are required.";
            res.locals.deletedPost = false;
            return res.json(res.locals);   
        }
    
        // Check if post exists and belongs to the specified user <-------- might need to replace or change a bit
        const checkSql = `
            SELECT * FROM csc648db.Post 
            WHERE PostID = ? AND AuthorID = ?;
        `;
        try {
            const [checkResult] = await db.query(checkSql, [postId, userId]);
            if (checkResult.length === 0) {
                
                res.locals.message = `No post found for postId: ${postId} under userId: ${userId}`;
                res.locals.deletedPost = false;
                return res.json(res.locals);   
            }
        } catch (checkError) {
            res.locals.message = "Error with query in delete post with searching.";
            res.locals.deletedPost = false;
            return res.json(res.locals);   
        }
    
        // Proceed to delete the post
        const deleteSql = `
            DELETE FROM csc648db.Post 
            WHERE PostID = ? AND AuthorID = ?;
        `;
        try {
            await db.query(deleteSql, [postId, userId]);
            res.locals.deletedPost = true;
            res.locals.message = "Post deleted successfully.";
            next();
        } catch (deleteError) {
            res.locals.message = "Error with query in delete post when deleting.";
            res.locals.deletedPost = false;
            return res.json(res.locals);   
        }
    },
    

};


