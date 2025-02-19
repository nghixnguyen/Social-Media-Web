const express = require('express');
var router = express.Router();

const auth = require("../middlewares/auth");
const message = require("../middlewares/message");

/**
 * get the messages 
 * based on the fromuser and touser
 * input: 
 *  fromUser
 *  toUser
 */
router.get("/getMessage", auth.isLoggedIn, message.getMessage, function(req,res){
    res.json(res.locals.getMessage);
});


/**
 * add a message
 * input:
 *  fromUser
 *  toUser
 */
router.post("/addMessage", auth.isLoggedIn, message.sendMessage, function(req,res){
    res.json(res.locals.sendMessage);
});


router.post("deleteMessage", function(req,res){

});





module.exports = router;