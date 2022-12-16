const bcrypt = require("bcrypt");
const express =require("express");
const router = express.Router();
const {models} = require("../models/index.js");
const cors = require("cors");
const {sign} = require('jsonwebtoken');
const {validateToken} = require('../middleware/Auth');


router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// create a user and use sequelize to store it into the databse in the correct format
router.post("/registration", async (req,res) => {
    const {username, password, email} = req.body;
    bcrypt.hash(password,10).then((hash) => {
        userTable.create({
            name: username,
            password: hash,
            email: email
        });
      
        res.send(("You have registered a user"))
        console.log(("user succesfully created on userTable"))
    });
});

router.post("/login", async (req,res) => {
    const {username, password} = req.body;

    // grab the username based on what is in the body
    const user = await userTable.findOne({ where: {name: username}});
    console.log(user.name);
    if (!user) res.json({error: "User does not exist!"});
    
    // compare hashed password with the hashed password to ensure it is the correct user
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({error: "Wrong username or password"});

        // assign the token the username and id of the user once they login
        const webToken = sign(
            {username: user.name, id: user.id}, 
            "secret"
            );

        res.json({token: webToken, username: user.username, id: user.id});
        res.json({token: webToken, username: user.name, id: user.id})
        console.log(webToken)
        console.log(user.id)
    })
});

router.get('/auth', validateToken, (req,res) => {
    res.json(req.username)
    console.log(req.username)
});




module.exports = router;