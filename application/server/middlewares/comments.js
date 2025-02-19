const db = require("../config/db");

module.exports = {
    
    // Fetch all comments for a specific post
    fetchCommentsByPostId: async (req, res, next) => {
        try {
            const {postId} = req.query;  // Get postId from URL parameters.
            
            if (!postId) {
                res.locals.commentFound = false; 
                res.locals.message = "Error Post ID not provided."; 
                return res.json(res.locals);  // Returning the entire res to the route 
            }
    
            // const sql = `
            //     SELECT * FROM csc648db.Comment
            //     WHERE PostID = ?;
            // `;
            const sql = `
            Select * from Comment c INNER JOIN RegisteredUser u ON c.authorID = u.UserID AND PostID = ?;`
    
            // Destructure the response to only get the result set (the comments).
            const [comments] = await db.query(sql, [postId]);
           // console.log(comments);
            res.locals.commentFound = true; 
            res.locals.comments = comments;
            next();
        } catch (error) {
            res.locals.commentFound = false; 
            res.locals.message = "Error with query in fetchCommentByPostId."; 
            return res.json(res.locals);  // Returning the entire res to the route 
        }
    },

    // Add a new comment to a post
    addComment: async (req, res, next) => {
        console.log("addComment function called");
        
        const postId = req.params.postId;  // Get postId from URL parameters.
        const { authorId, commentText } = req.body;
        
        // Validate input
        if (!postId || !authorId || !commentText) {
            res.locals.addedComment = false; 
            res.locals.message = "Post ID, Author ID, and Comment Text are required."; 
            return res.json(res.locals);  
        }

        const sql = `
            INSERT INTO csc648db.Comment (PostID, AuthorID, Comment, CreatedDate)
            VALUES (?, ?, ?, CURDATE());
        `;

        try {
            await db.query(sql, [postId, authorId, commentText]);
            res.locals.addedComment = true; 
            res.locals.message = "Added comment successfully."; 
            next(); // Move to the next middleware or route if comment is added successfully
        } catch (error) {
            res.locals.addedComment = false; 
            res.locals.message = "Error with the query in addComment."; 
            return res.json(res.locals);  
        }
    },


    editComment: (req, res, next) => {
        const commentId = req.params.commentId;
        const newCommentData = req.body.comment;

        if (!newCommentData) {
            res.locals.editedComment = false;
            res.locals.message = 'New comment data is required.';
            return res.json(res.locals);  
        }

        const sql = `
            UPDATE CommentsTable SET CommentContent = ? WHERE CommentID = ?;
        `;

        db.query(sql, [newCommentData, commentId])
            .then(([result]) => {
                if (result.affectedRows === 0) {
                    res.locals.editedComment = false;
                    res.locals.message = 'Comment not found.';
                    return res.json(res.locals);  

                } else {
                    res.locals.editedComment = true;
                    res.locals.message = 'Comment updated successfully';
                }
                next(); // next when success
            })
            .catch(error => {
                console.error('Error editing comment:', error.stack);
                res.locals.editedComment = false;
                res.locals.message = 'Error updating the comment.';
                return res.json(res.locals);  
            });
    },


    deleteComment: async (req, res) => {

    },

}

