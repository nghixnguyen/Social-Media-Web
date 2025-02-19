const express = require("express");
const cors = require("cors"); 
const app = express();
const port = process.env.PORT || 4000;
const db = require("./config/db");

app.use(cors()); 

app.get("/test", async (req, res) => {
    try {
        const [rows, fields] = await db.execute(
            `SELECT r.UserID, r.FirstName, r.LastName, s.Major
             FROM RegisteredUser r
             JOIN Student s ON r.UserID = s.UserID
             WHERE s.Major = 'Computer Science';`
        );
        console.log(rows);
        res.json({ data: rows }); // Wrap the 'rows' data in an object with a key 'data'
    } 
    catch(error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
