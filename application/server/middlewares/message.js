const db = require("../config/db");


module.exports = {

    getMessage: async (req, res, next) => {
        res.locals.getMessage = {}; // Initialize the response object
    
        let loggedInUserId = null;
        if (req.session && req.session.user) {
            loggedInUserId = req.session.user.UserID; // getting the user ID from the session
        }
    
        const { otherUserId } = req.body; // getting the other user (receiver) from the body
    
        if (!loggedInUserId || !otherUserId) {
            res.locals.getMessage.status = false;
            res.locals.getMessage.statusMessage = "Invalid Receiver or Sender."
            return res.json(res.locals.getMessage);
        }
    
        const query = `
        SELECT *
        FROM Messages
        WHERE (SenderID = ? AND ReceiverID = ?) OR (SenderID = ? AND ReceiverID = ?)
        ORDER BY SentTime;`;
    
        try {
            const [messages] = await db.query(query, [loggedInUserId, otherUserId, otherUserId, loggedInUserId]);
            res.locals.getMessage.status = true;
            res.locals.getMessage.statusMessage = `Message fetched successfully for UserId = ${loggedInUserId} and UserID = ${otherUserId}`;
            res.locals.getMessage.messages = messages;
            next();
        } catch (error) {
            res.locals.getMessage.status = false;
            res.locals.getMessage.statusMessage = "Error fetching messages.";
            return res.json(res.locals.getMessage);
        }
    },
    sendMessage: async (req, res, next) => {
        res.locals.sendMessage = {}; // Initialize the response object
    
        let loggedInUserId = null;
        if (req.session && req.session.user) {
            loggedInUserId = req.session.user.UserID; // getting the user ID from the session
        }
    
        const { receiverId, messageText } = req.body; // getting the receiver ID and message text from the body

        console.log("This is the receiverId = " + receiverId);
        console.log("This is the message text = " + messageText);
    
        if (!loggedInUserId || !receiverId || !messageText) {
            res.locals.sendMessage.status = false;
            res.locals.sendMessage.statusMessage = "Invalid data provided for sending a message.";
            return res.json(res.locals.sendMessage);
        }
    
        const query = `
        INSERT INTO Messages (SenderID, ReceiverID, MessageText) 
        VALUES (?, ?, ?);`;
    
        try {
            await db.query(query, [loggedInUserId, receiverId, messageText]);
            res.locals.sendMessage.status = true;
            res.locals.sendMessage.statusMessage = `Message sent successfully from UserId = ${loggedInUserId} to UserId = ${receiverId}`;
            next();
        } catch (error) {
            res.locals.sendMessage.status = false;
            res.locals.sendMessage.statusMessage = "Error sending message.";
            return res.json(res.locals.sendMessage);
        }
    }

}