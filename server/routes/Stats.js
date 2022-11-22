const express =require("express");
const db = require("../models");
const router = express.Router();
const {pdata} = require("../models");
const player = require("../models/player");


router.get("/", async (req,res)=>{ //Fetches all player stats
    const listOfStats = await pdata.findAll();
    res.json(listOfStats);
    console.log("Stats have been recieved");
    
router.post("/", async (req,res) => { 
    const stats = req.body;
    await pdata.create(stats);
    res.json(stats);
})
})
module.exports = router; //in order to access this router in index.js