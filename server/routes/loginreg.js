const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const router = express.Router();
const {models} = require("../models/index.js");

const app = express();

app.use(express.json());
// app.use(cors());

// const db = mysql.createConnection({
//     user: "sql9561149",
//     host: "sql9.freemysqlhosting.net",
//     password:"gBDbbdhaRT",
//     database: "sql9561149",

// });


// app.listen(3000, () => {
//     console.log("running server");
// });

router.post('/' , async (req, res) => {

    // const testUser = await testTable.create(

    // )

    console.log("reached registerUser");
    console.log(req.body)

});

router.post('/registerUser', async (req, res) => {

    const data = req.body;
    await testTable.create(data);
    res.json(data);



    // const username = req.body.data;
    // const password = req.body.data;
    // console.log(reg.body.data);

    // const { username, password } = req.body;
    // console.log(req.body);

    // db.query(
    // "INSERT INTO testTable (username, password) VALUES (?,?)", 
    // [username, password], 
    // (err,res)=> {
    // console.log(err);
    //     }
    // );
});


module.exports = router;