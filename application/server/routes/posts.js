const express = require('express');
const router = express.Router();
const db = require("../config/db"); // Path for db pool


const userMiddleware = require('../middlewares/users'); 
const postMiddleware = require('../middlewares/posts'); 
const commentsMiddleware = require('../middlewares/comments'); 
const multimedia = require('../middlewares/multimedia');
const auth = require('../middlewares/auth');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  // This is a basic configuration. You might want to use `multer.memoryStorage()` or configure `multer-s3` if you are uploading to S3.


// need to also add isloggedin

//test to see if one can get loggedin user posts

// postMiddleware.fetchLikes this is non existent
// get posts for general users in home page
router.get("/getPosts", postMiddleware.fetchPosts, multimedia.fetchMedia, function (req,res, next){
    var results = {
        posts: res.locals.posts,
        postFound: res.locals.postFound
    }
    res.json(results);
});

// retrieve logged in user posts
router.get('/myPosts', auth.isLoggedIn, postMiddleware.fetchUserPosts,  multimedia.fetchMedia, function(req,res){
    //console.log(req.session.user);
    //console.log(req.locals);
    var results = {
        posts : res.locals.posts, 
        postFound : res.locals.postFound}
    res.json(results);
});


// Fetch a single post by postId
// why this route also calling fetchUserPosts?
router.get('/:postId(\\d+)',postMiddleware.fetchSinglePost, postMiddleware.fetchUserPosts, (req, res,  next) => {
    res.json(res.locals.post);
});


// Fetch all posts by userId in descending order
router.get('/user/:userId', postMiddleware.fetchUserPosts, multimedia.fetchMedia, (req, res, next) => {
    res.json(res.locals.posts); 
});


// Create post by userID 
router.post('/',  upload.single('media'), postMiddleware.createPost, multimedia.createMedia, (req, res, next) => {
    var results = {
        post: res.locals.postCreated,
        media: res.locals.mediaCreated
    }
    res.json(results);


});

// edit post description
router.put('/edit/:postId', postMiddleware.editPost, (req, res, next) => {
    res.json(res.locals.post);
});

// delete post
router.delete('/delete/:userId', postMiddleware.deletePost, (req, res, next) => {
    res.json(res.locals);
});

// upload into bucket
// router.post("/upload-media",multimedia.uploadMedia, (req,res, next) => {
//     res.json({ mediaUrl: res.locals.media });
// });

module.exports = router; 
