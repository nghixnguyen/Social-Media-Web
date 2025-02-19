const express = require('express');
const router = express.Router();
const db = require("../config/db"); // Path for db pool
const auth = require('../middlewares/auth');
const friends = require('../middlewares/friends');

// get all friends from user
router.get("/", auth.isLoggedIn, friends.fetchFriends, function (req, res, next){
    var results = {
        fetchFriends: res.locals.friendsFetched
    }
    res.json(results);
} );

// Send a friend request
router.post("/sendRequest", auth.isLoggedIn, friends.sendFriendRequest, (req, res, next) => {
    res.json(res.locals.friendRequestStatus);
});

// Accept a friend request
router.post("/acceptRequest", auth.isLoggedIn, friends.acceptFriendRequest, (req, res, next) => {
    res.json(res.locals.friendRequestStatus);
});

// Decline a friend request
router.post("/declineRequest", auth.isLoggedIn, friends.declineFriendRequest, (req, res, next) => {
    res.json(res.locals.friendRequestStatus);
});

// Remove a friend
router.delete("/removeFriend", auth.isLoggedIn, friends.removeFriend, (req, res, next) => {
    res.json(res.locals.friendRemovalStatus);
});

// Show all friend requests
router.get("/friendRequests", auth.isLoggedIn, friends.pendingFriendRequest, (req, res, next) => {
    res.json(res.locals.friendsFetched);
});

module.exports = router; 


