const express =require("express");
const { col } = require("sequelize");
const db = require("../models");
const router = express.Router();
const {pdata, sequelize} = require("../models");
const Friends = require("../models/Friends");

router.get("/", async (req,res)=>{ //Fetches all player stats
    const playerStats = await friends.findAll(
    {   
        include: [{
            where: {Id: 6},
            model: player, as: 'player',
            include: [{
                model:pdata,
            }]
        },
        { 
            model: player, as : 'friend',
        }]

    });

   /* const playerStats = await player.findAll(
        {   where: {Id: 2},
           include: [{
            //    model: pdata
           // },
           // { 
                model: friends,

            }]
    
        });*/
    res.json(playerStats);
    console.log("Stats have been recieved");
    console.log(JSON.stringify(playerStats,null,2));

router.post("/", async (req,res) => { 
    const stats = req.body;
    await pdata.create(stats);
    res.json(stats);
})
})
module.exports = router; //in order to access this router in index.js