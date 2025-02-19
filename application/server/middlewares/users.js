const bcrypt = require('bcrypt');
const db = require("../config/db"); 

module.exports = {

    validateRegistration: (req, res, next) => {
        const { firstName, lastName, email, password } = req.body;
        
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        next();
    },

    validateLogin: (req, res, next) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Both username and password are required' });
        }

        next();
    },

    hashPassword: async (req, res, next) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        next();
    },

    RegistrationHandler: async (req, res) => {
        const { firstName, lastName, email, password } = req.body;
    
        try {
            const sql = `
                INSERT INTO RegisteredUser (FirstName, LastName, Email, Password)
                VALUES (?, ?, ?, ?);
            `;
            await db.query(sql, [firstName, lastName, email, password]);
            res.json({ message: "User registered successfully" });
        } catch (error) {
            console.error('Error with registration:', error.stack);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }, 

    checkEmailUniqueness: async (req, res, next) => {  // Fixed the assignment operator
        const { email } = req.body;
        try {
            const sql = 'SELECT * FROM RegisteredUser WHERE Email = ?';
            const [users] = await db.query(sql, [email]);
            if (users.length > 0) {
                return res.status(400).json({ error: 'Email already registered' });
            }
            next();
        } catch (error) {
            console.error('Error checking email uniqueness:', error.stack);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    emailCheck: function(req, res, next) {
        const { email } = req.body;
        const emailParts = email.split("@");
        console.log(emailParts);

        if(emailParts[1] !== "sfsu.edu") {
            return res.status(400).json({ error: 'Invalid email domain' }); 
        }
        next();
    },

    updateUserProfile: async (req, res, next) => {  // Removed the duplicate method definition
        const userId = req.params.userId;
        const { firstName, lastName, email } = req.body;

        try {
            const sql = `
                UPDATE RegisteredUser 
                SET FirstName = ?, LastName = ?, Email = ?
                WHERE UserID = ?;
            `;
            await db.query(sql, [firstName, lastName, email, userId]);
            res.locals.message = 'Profile updated successfully';
            next();
        } catch (error) {
            console.error('Error with updating user profile:', error.stack);
            return res.json({ messasge: 'Internal Server Error' });
        }
    }, 

    validateUserId: (req, res, next) => {
        console.log("Running validateUserId");
        const userId = req.params.userId;
        console.log("This is the userID = " + userId);
        // First, ensure userId is a valid number
        if (!userId || isNaN(Number(userId))) {
            return res.json({ message: 'Invalid userId' });
        }
        
        // Next, check against the database
        const sql = `
            SELECT COUNT(*) as count FROM csc648db.RegisteredUser
            WHERE UserID = ?;
        `;
        
        db.query(sql, [userId])
            .then(([results]) => {
                if (results[0].count === 0) {
                    // User does not exist in the database
                    return res.json({ message: 'User not found' });
                } else {
                    next();  // User exists, move to the next middleware
                }
            })
            .catch(error => {
                console.error('Error validating userId:', error.stack);
                return res.json({ message: 'Error validating userId' });
            });
    },

    fetchUserProfile: async (req, res, next) => {
        const userId = req.params.userId;
        try {
            const sql = `SELECT * FROM RegisteredUser WHERE UserID = ?`;
            const [users] = await db.query(sql, [userId]);
            if (users.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.locals.user = users[0];
            next();
        } catch (error) {
            console.error('Error with getting the user profile:', error.stack);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    searchForUserByName: async function(req, res, next) {
        const { search } = req.query;
        //console.log("search: " + search);
        let nameParts = search.split(" ");
        let firstName = nameParts[0] ? nameParts[0] : '*';
        let lastName = nameParts[1] ? nameParts[1] : '*';
        
        try {
            const sql = `SELECT UserID, FirstName, LastName FROM RegisteredUser WHERE FirstName LIKE ? OR LastName LIKE ?`;
            const [users] = await db.query(sql, [`${firstName}%`, `${lastName}%`]);
            if (users.length === 0) {
                return res.json({ searchedUserFound : false });

            }
            res.locals.searchedUser = users;
            next();
        } catch (error) {
            console.error('Error with getting the user profile:', error.stack);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    searchForUserByID: async function(req, res, next) {
        const {userId} = req.query;
        
        try {
            const sql = `SELECT * FROM RegisteredUser WHERE UserID = ?`;
            const [users] = await db.query(sql, [userId]);
            if (users.length === 0) {
                return res.json({searchedUserFound : false});
            }
            res.locals.searchedUser = users[0];
            res.locals.searchedUserFound = true;
            next();
        } catch (error) {
            console.error('Error with getting the user profile:', error.stack);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },




};
