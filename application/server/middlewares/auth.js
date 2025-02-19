const bcrypt = require('bcrypt');
var db = require("../config/db");


module.exports = {
    isLoggedIn: function (req, res, next){
        if(req.session.user){
            next();
        }
        else {
            req.session.save(function(err) {
                if (err) next(err);
                return res.json({
                    isLoggedIn : false
                });
            });
        }
    },
    checkEmail:  async function (req, res, next) {
        //console.log(req.body);
        var {email} = req.body;
        console.log("This is the email = " + email);
        const emailParts = email.split("@");
        
        if(emailParts[1] !== "sfsu.edu"){
            //console.log("return false here");
            return res.json({
                validEmail: false,
                emailExist: false,
            });
        }
        
        next();
    },
    
    checkLogin: async function(req, res,next) {
        
        var {email, password} = req.body;
        try {
            var [result, fields] = await db.execute(
                `SELECT * from csc648db.RegisteredUser where Email=? and Password=?`,
                [email, password]
            );
            if (result && result.length == 1){
                var user = result[0];
                req.session.user = user;
                //console.log("reached here to set req.session.user ?");
                next();
            }
            else {
                return res.json({
                    isLoggedIn: false,
                    validPassword: false,
                    validEmail: true,
                    emailExist: true,
                });
            }
        }
        catch (error) {
            res.status(500);
            res.json(error);
        }
    }, 
    checkEmailUniqueness: async (req, res, next) => {
        const { email } = req.body;
        try {
            const sql = 'SELECT * FROM csc648db.RegisteredUser WHERE Email = ?';
            const [users] = await db.query(sql, [email]);
            if (users.length > 0) {

                return res.json({
                    validEmail: true,
                    emailExist: true,
                    isRegistered: false,
                });
                
            }
            else{
                next();
            }
            
        } catch (error) {
            console.error('Error checking email uniqueness:', error.stack);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    checkSignup: async function (req, res, next) {
        const { fName, lName, email, password } = req.body;
        try {            
            
            // If the email and username are valid and not registered, save them to the database
            const [row, fields] = await db.execute(
                'INSERT INTO csc648db.RegisteredUser (FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)',
                [fName, lName, email, password]
            );
            if (row && row.affectedRows == 1){
                next();
            }
            // else {
            //     console.log("reach line 102");
            //     return res.json({
            //         validEmail: true,
            //         emailExist: true,
            //         isRegistered: false,
            //     });
            // }
        } catch (error) {
            res.json(error);
        }
    },

}

