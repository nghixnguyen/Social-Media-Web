const express = require('express');
const router = express.Router();

const likes = require('../middlewares/likes'); 
const user = require('../middlewares/auth');

/**
 * Everything in here SHOULD be also calling the get single post I believe, in order to add comments into it 
 */


/**
 * get likes for a particular post by ID
 */
router.get("/getLikes", likes.getLikes, function(req,res, next){
    return res.json(res.locals.getLikesResponse);  
});

/**
 * add a like to a particular post
 */
router.post("/addLike", user.isLoggedIn, likes.addLike, function(req, res, next){
    return res.json(res.locals.addLikeResponse);  
});
/**
 * delete a like from a post
 */
router.post("/deleteLike", user.isLoggedIn, likes.removeLike, function(req,res,next){
    return res.json(res.locals.removeLikeResponse);  
});

module.exports = router;