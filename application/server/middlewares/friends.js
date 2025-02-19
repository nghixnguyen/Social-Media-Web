const db = require("../config/db");
module.exports = {

    fetchFriends: async (req, res, next) => {
        const userId = req.session.user.UserID; 
        console.log("This is the userID = ", userId);
        

        const query = `
            SELECT r.UserID, r.FirstName, r.LastName, r.Email, r.PathToProfilePicture
            FROM RegisteredUser r
            JOIN Friendship f ON (r.UserID = f.User1ID OR r.UserID = f.User2ID)
            WHERE (f.User1ID = ? OR f.User2ID = ?) AND f.Status = 'Accepted' AND r.UserID != ?
        `;

        try {
            const result = await db.query(query, [userId, userId, userId]);
            friends = result[0];
            console.log(friends);
            res.locals.friendsFetched = {
                listOfFriends: friends
            };
            next();
        } catch (err) {
            res.locals.friendsFetched = {
                message: "Unable to fetch friends. DB error",
                success: false,
            };
            return res.json(res.locals.friendsFetched);
        }
    },

    sendFriendRequest: async (req, res, next) => {
        const userId = req.session.user.UserID; 
        const { recipientId } = req.body; 

        if(!recipientId) {
            res.locals.friendRequestStatus = { 
                success: false, 
                message: "Invalid recipient"
            };
            return res.json(res.locals.friendRequestStatus);

        }


        if(userId == recipientId) {
            res.locals.friendRequestStatus = { 
                success: false, 
                message: "Error. Attempting to send yourself a friend request."
            };
            return res.json(res.locals.friendRequestStatus);
        }

        // Modified query to check for 'Pending' and 'Accepted' statuses
        const checkQuery = `SELECT * FROM Friendship 
                            WHERE ((User1ID = ? AND User2ID = ?) OR (User1ID = ? AND User2ID = ?))
                            AND Status IN ('Pending', 'Accepted')`;
    
        const insertQuery = `INSERT INTO Friendship (User1ID, User2ID, Status, RequestedDate) 
                             VALUES (?, ?, 'Pending', CURDATE())`;
    
        try {
            const result = await db.query(checkQuery, [userId, recipientId, recipientId, userId]);
            const existing = result[0];
            console.log("Printing existing = ", existing);

            if (existing.length > 0) {
                res.locals.friendRequestStatus = { 
                    success: false, 
                    message: "Friend request already sent or already friends."
                };
                return res.json(res.locals.friendRequestStatus);
            }
    
            await db.query(insertQuery, [userId, recipientId]);
            res.locals.friendRequestStatus = { 
                success: true, 
                message: "Friend request sent successfully."
            };
            next();
        } catch (err) {
            res.locals.friendRequestStatus = { 
                success: false, 
                message: "Error sending friend request."
            };
            return res.json(res.locals.friendRequestStatus);
        }
    },    

    pendingFriendRequest: async(req, res, next) => {
        const userId = req.session.user.UserID; 
        console.log("This is the userID  = ", userId);

        const query = `SELECT * FROM Friendship 
                       WHERE User2ID = ? AND Status = 'Pending'`;
    
        try {
            const result = await db.query(query, [userId]);
            const pendingRequests = result[0];
    
            res.locals.friendsFetched = {
                pendingList: pendingRequests,
                success: true
            };    
            next(); 
        } catch (err) {
            res.locals.friendsFetched = {
                message: "Error fetching pending friend requests.",
                success: false,
            };
            return res.json(res.locals.friendsFetched);
        }
    },

    acceptFriendRequest: async (req, res, next) => {
        const userId = req.session.user.UserID; 
        const { requesterId } = req.body; 
    
        if(!requesterId) {
            res.locals.friendRequestStatus = { 
                success: false, 
                message: "Invalid requesterId" 
            };
            return res.json(res.locals.friendRequestStatus);
        }
    
        console.log("Logged in as = " , userId);
        console.log("Accepting this userId's req = ", requesterId);
    
        if(userId == requesterId) {
            res.locals.friendRequestStatus = { 
                success: false, 
                message: "Error. Attempting to accept your own friend request." 
            };
            return res.json(res.locals.friendRequestStatus);
        }
    
        const checkQuery = `SELECT * FROM Friendship 
                            WHERE User1ID = ? AND User2ID = ? AND Status = 'Pending'`;
        try {
            const [rows] = await db.query(checkQuery, [requesterId, userId]);
            if (rows.length === 0) {
                res.locals.friendRequestStatus = { 
                    success: false, 
                    message: "No pending friend request found." 
                };
                return res.json(res.locals.friendRequestStatus);
            }
    
            const acceptQuery = `UPDATE Friendship SET Status = 'Accepted', AcceptedDate = CURDATE() 
                                 WHERE User1ID = ? AND User2ID = ? AND Status = 'Pending'`;
            await db.query(acceptQuery, [requesterId, userId]);
            res.locals.friendRequestStatus = { 
                success: true, 
                message: "Friend request accepted." 
            };
            next();
        } catch (err) {
            res.locals.friendRequestStatus = {
                success: false, 
                message: "Error accepting friend request." 
            };
            return res.json(res.locals.friendRequestStatus);
        }
    },
    

    declineFriendRequest: async (req, res, next) => {
        const userId = req.session.user.UserId; 
        const { requesterId } = req.body;

        if(!requesterId || userId == requesterId) {
            res.locals.friendRequestStatus = { 
                success: false, 
                message: "Invalid requesterId." 
            };
            return res.json(res.locals.friendRequestStatus);
        }

        const query = `UPDATE Friendship SET Status = 'Declined' 
                       WHERE User1ID = ? AND User2ID = ? AND Status = 'Pending'`;

        try {
            await db.query(query, [requesterId, userId]);
            res.locals.friendRequestStatus = { 
                success: true, 
                message: "Friend request declined." 
            };
            next();
        } catch (err) {
            res.locals.friendRequestStatus = {
                success: false,
                message: "Error declining friend request."
            };
            return res.json(res.locals.friendRequestStatus);
        }
        
    },

    removeFriend: async (req, res, next) => {
        const userId = req.session.user.UserID; 
        const { friendId } = req.body; 
    
        // Check for valid friendId
        if (!friendId || friendId === userId) {
            res.locals.friendRemoved = { 
                success: false, 
                message: "Invalid friendId." 
            };
            return res.json(res.locals.friendRemoved);
        }

        if(friendId == userId) {
            res.locals.friendRemoved = { 
                success: false, 
                message: "Error, attempting to remove yourself." 
            };
            return res.json(res.locals.friendRemoved);
        }


    
        console.log("Logged in User = ", userId);
        console.log("Friend to be removed = ", friendId);
    
        const checkQuery = `SELECT * FROM Friendship 
                            WHERE ((User1ID = ? AND User2ID = ?) OR (User1ID = ? AND User2ID = ?)) 
                            AND Status = 'Accepted'`;
       
        try {
            const result = await db.query(checkQuery, [userId, friendId, friendId, userId]);
            const existingFriendship = result[0];

            if (existingFriendship.length === 0) {
                res.locals.friendRemoved = { 
                    success: false, 
                    message: "No exisiting friendship to remove." 
                };
                return res.json(res.locals.friendRemoved);
            }
    
            const deleteQuery = `DELETE FROM Friendship 
                                 WHERE (User1ID = ? AND User2ID = ?) OR (User1ID = ? AND User2ID = ?)`;
            await db.query(deleteQuery, [userId, friendId, friendId, userId]);
            res.locals.friendRemoved = { 
                success: true, 
                message: "Friend successfully removed." 
            };
            return res.json(res.locals.friendRemoved);
        } catch (err) {
            res.locals.friendRemoved = { 
                success: false, 
                message: "Error removing friend." 
            };
            return res.json(res.locals.friendRemoved);

        }
    }
    
    
};