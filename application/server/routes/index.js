const bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();
const {isLoggedIn,checkEmail,checkLogin,checkSignup,checkEmailUniqueness} = require("../middlewares/auth");
const {searchForUserByName} = require("../middlewares/users");

router.get("/",isLoggedIn, function(req,res, next) {
    // console.log(req.headers);
    res.json("testing");
});

router.post("/testLogin", (req,res) => {
    req.session.accessToken = "123123";
    console.info("signin success");
    console.log("do i get past here in the first place?");
    res.status(200).end();
});
router.post("/signup",checkEmailUniqueness,checkSignup, function (req, res, next) {
    res.json({
        validEmail: true,
        emailExist: true,
        isRegistered: true,
    });
});

router.post("/login",checkEmail,checkLogin, function(req,res, next){
    //console.log(req.headers);
    console.log("why are you not here?");
    return res.json({
        user : req.session.user,
        isLoggedIn:true,
    });
});

/**
 * logout
 */
router.post("/logout", async function (req, res, next) {
    req.session.destroy(function(err){
        if(err){
            next(err);
        }
        return res.json({
            isLoggedIn: false,
        });
    })
});

/**
 * search for a user
 */
router.get("/search",searchForUserByName, function(req, res){
    // res.json(req.query);
    result = {
        searchedUserFound : true,
        searchedUser: res.locals.searchedUser
    }
    res.json(result);
});


module.exports = router;    