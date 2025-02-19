const express = require('express');
const router = express.Router();
const db = require("../config/db");  // Path for db pool
const bcrypt = require('bcrypt');
const userMiddleware = require('../middlewares/users'); 
const auth = require('../middlewares/auth');
const postMiddleware = require('../middlewares/posts');

// User registration
// router.post('/register', middleware.validateRegistration, middleware.hashPassword, middleware.RegistrationHandler, middleware.checkEmailUniqueness);

router.get("/", function(req,res){
    res.json(req.session.user);
})

// get logged user profile
router.get('/profile', auth.isLoggedIn, function (req,res, next){
    res.json(req.session.user);
    
});

router.get('/(\\d+)',userMiddleware.searchForUserByID, (req, res) => {
    var results = {
        user : res.locals.searchedUser,
        userFound : res.locals.searchedUserFound,
    }
    res.json(results);
});


// Get user profile
router.get('/:id(\\d+)', userMiddleware.validateUserId, userMiddleware.fetchUserProfile, (req, res) => {
    res.json(res.locals.user);
});





module.exports = router;
