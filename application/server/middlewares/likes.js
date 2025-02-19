const db = require("../config/db");



module.exports = {

    getLikes: async (req, res, next) => {
        const postId = req.body.postId;  
        if (!postId) {
            res.locals.getLikes = false;           
            res.locals.message = "Post ID Required";
            return res.json(res.locals);  
        }

        res.locals.getLikesResponse = {};

        // const sql = `SELECT COUNT(*) AS TotalLikes FROM csc648db.UserLikes WHERE PostID = ?;`; // manually counting the total likes from the UserLike tables
        const sql = `SELECT LikesCount AS TotalLikes FROM csc648db.Post WHERE PostID = ?;`; // getting the column of the likes from the Post table
        try {
            const [results] = await db.query(sql, [postId]);
            if (results.length > 0) {
                res.locals.getLikesResponse.getLikes = true;           
                res.locals.getLikesResponse.message = `Fetching likes for PostID = ${postId}`;
                res.locals.getLikesResponse.totalLikes = results[0].TotalLikes;
                next();
            } else {
                res.locals.getLikesResponse.getLikes = true;           
                res.locals.getLikesResponse.message = "No likes yet.";
                res.locals.getLikesResponse.totalLikes = 0; 
                next();
            }
        } catch (error) {
            res.locals.getLikesResponse.getLikes = false;           
            res.locals.getLikesResponse.message = "Error fetching likes.";
            return res.json(res.locals.getLikesResponse); 
            
        }
    },
    
    addLike: async(req, res, next) => {
        const { postId } = req.body;
        let userId = null;
        if (req.session && req.session.user) {
            userId = req.session.user.UserID;
        }
    
        res.locals.addLikeResponse = {};
    
        if (!postId) {
            res.locals.addLikeResponse.addLike = false;           
            res.locals.addLikeResponse.message = "PostID is required";
            return res.json(res.locals.addLikeResponse);  
        }
    
        const checkLikeSql = `SELECT * FROM csc648db.UserLikes WHERE UserID = ? AND PostID = ?;`;
        const addLikeSql = `INSERT INTO csc648db.UserLikes (UserID, PostID) VALUES (?, ?);`;
        
        try {
            const [likeCheck] = await db.query(checkLikeSql, [userId, postId]);
            if (likeCheck.length > 0) {
                res.locals.addLikeResponse.addLike = false;           
                res.locals.addLikeResponse.message = `User: ${userId} has already liked the post.`;
                return res.json(res.locals.addLikeResponse);  
            } 
    
            await db.query(addLikeSql, [userId, postId]);
            res.locals.addLikeResponse.addLike = true;
            res.locals.addLikeResponse.message = `User: ${userId} has successfully liked the post.`;
            next();
    
        } catch (error) {
            console.error("Error in addLike:", error);
            res.locals.addLikeResponse.addLike = false;
            res.locals.addLikeResponse.message = "Error adding like: " + error.message;
            return res.json(res.locals.addLikeResponse);
        }
    },
    
    removeLike: async(req, res, next) => {
        const { postId } = req.body;
        let userId = null;
        if (req.session && req.session.user) {
            userId = req.session.user.UserID;
        }
    
        res.locals.removeLikeResponse = {};
    
        if (!postId) {
            res.locals.removeLikeResponse.removeLike = false;
            res.locals.removeLikeResponse.message = "PostID is required";
            return res.json(res.locals.removeLikeResponse);
        }
    
        const checkLikeSql = `SELECT * FROM csc648db.UserLikes WHERE UserID = ? AND PostID = ?;`;
        const removeLikeSql = `DELETE FROM csc648db.UserLikes WHERE UserID = ? AND PostID = ?;`;
    
        try {
            const [likeCheck] = await db.query(checkLikeSql, [userId, postId]);
            if (likeCheck.length === 0) {
                res.locals.removeLikeResponse.removeLike = false;
                res.locals.removeLikeResponse.message = `User: ${userId} did not like the post.`;
                return res.json(res.locals.removeLikeResponse);
            }
    
            await db.query(removeLikeSql, [userId, postId]);
            res.locals.removeLikeResponse.removeLike = true;
            res.locals.removeLikeResponse.message = `Removed the like for User: ${userId}`;
            next();
    
        } catch (error) {
            console.error("Error in removeLike:", error);
            res.locals.removeLikeResponse.removeLike = false;
            res.locals.removeLikeResponse.message = "Error removing like";
            return res.json(res.locals.removeLikeResponse);
        }
    }    
};





