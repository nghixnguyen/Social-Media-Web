const express = require('express');
const router = express.Router();
const db = require("../config/db"); // Path for db pool
const commentsMiddleware = require("../middlewares/comments");

// -- beginning of comment api's for posts --

router.get("/getComments",commentsMiddleware.fetchCommentsByPostId, function (req, res){
    var results = {
        comments : res.locals.comments,
        commentFound : res.locals.commentFound,
    }
    res.json(results);
} );

// creating a comment under a specific post
router.post('/:postId/comments', commentsMiddleware.addComment, (req, res, next) => {
    res.json(res.locals);
});

// getting all comments under a post
router.get('/:postId/comments', commentsMiddleware.fetchCommentsByPostId, (req, res, next) => {
    res.json(res.locals.comment);
});


// editing a comment
router.put('/comments/:commentId', commentsMiddleware.editComment, (req, res, next) => {
    res.json(res.locals.comment);
});

// deleting a  comment
router.delete('/comments/:commentId', commentsMiddleware.deleteComment, (req, res) => {
    res.json(res.locals.comment);
});

module.exports = router;