const mysql = require('mysql2');
require("dotenv").config();


const pool = mysql.createPool({
    host     : process.env.RDS_DB_HOST,
    user     : process.env.RDS_USERNAME,
    database : process.env.RDS_DB_NAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT,
    
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, 
    idleTimeout: 60000,
    queueLimit: 0
  }).promise();



module.exports = pool;
