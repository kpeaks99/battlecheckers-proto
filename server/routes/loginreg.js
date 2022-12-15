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

    const user = await userTable.findOne({ where: {name: username}});

    if (!user) res.json({error: "User does not exist!"});
    
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({error: "Wrong username or password"});

        const webToken = sign(
            {username: user.username, id: user.id}, 
            "secret"
            );

        res.json({token: webToken, username: username, id: user.id});
    })
});

router.get('/auth', validateToken, (req,res) => {
    res.json(req.user)
});




module.exports = router;