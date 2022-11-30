const express =require("express");
const { DATE } = require("sequelize");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const db = require("../models");
const router = express.Router();
const {pdata} = require("../models");
const player = require("../models/Player");



    //registration
router.post("/registration", async (req,res)=> {
    //const salt = await bcrypt.genSalt(10); for password no implemented yet
    const username = req.body.username;
    const email = req.body.email;
    var user = {
        email : email,
        player_name : username,
        created_at :  new Date()
    };
    created_user = await player.create(user);
    console.log("User:" + req.body.username +"Has been created");
    res.json(created_user);
});


//Login    
router.post("/login", async (req,res) => { 
    const userlogin = await player.findOne({ where: {player_name : req.body.username }});
    if(userlogin){
        const valid = await player.findOne({where : {email : req.body.password }}); //email currently serves as password
        if(valid){
            token = jwt.sign({"id": userlogin.id, "username": userlogin.player_name}, // should not hold sensitive information
            process.env.SECRET)
            console.log("log in successful");
            res.status(200).json({token:token});
        } else{
            console.log("login failed");
            res.status(400).json({error : "Password Incorrect"});
        }

    }else{
        console.log("user does not exist");
        res.status(404).json({error : "user does not exist"});
    }
});

//Authenticate
router.get('/authme',
 async (req,res,next) =>{
    try{
        let token = req.headers['authorization'].split(" ")[1];
        let decoded = jwt.verify(token,process.env.SECRET);
        req.user = decoded;
        next();
    } catch(err){
        res.status(401).json({"msg" : "Cannot Authenticate"});
    }
}, 
async(req,res,next)=>{
    let user = await player.findOne({where : {id : req.user.id},attributes: {exclude:["password"]}});
    if (user===null){
        res.status(404).json({"msg" : "User Not Found"});
    }
    res.status(200).json(user);
});

module.exports = router;