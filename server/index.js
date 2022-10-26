const express = require("express");
const app = express();
const mysql = require('mysql');

/*Ch host - database to fit your db config*/
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "Kingdom#7467sora",
    database: "battlecheckers"
});

app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO `player` VALUES ('Johnny Test', '2022-25-10', 'test@email.com', 'offline');"
    db.query(sqlInsert, (err, result)=>{
        res.send("hello word");
    });
    
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
  });