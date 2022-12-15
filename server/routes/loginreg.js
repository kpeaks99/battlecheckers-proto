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
    const {username, password} = req.body;
    bcrypt.hash(password,10).then((hash) => {
        testTable.create({
            username: username,
            password: hash
        });
        res.json("You have registered a user");
    });
});

router.post("/login", async (req,res) => {
    const {username, password} = req.body;

    const user = await testTable.findOne({ where: {username: username}});

    if (!user) res.json({error: "User does not exist!"});

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({error: "Wrong username or password"});

        const webToken = sign(
            {username: user.username, id: user.id}, 
            "secret"
            );

        res.json(webToken);
    })
});

router.get('/auth', validateToken, (req,res) => {
    res.json(req.user)
});




module.exports = router;