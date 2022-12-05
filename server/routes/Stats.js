const express =require("express");
const router = express.Router();
const {models} = require("../models/index.js");

router.get("/", async (req,res)=>{ //Fetches all player stats
    const playerStats = await userFriends.findAll(
    {   
        include: [{
            where: {Id: 1},
            model: userTable, as: 'friend',
   //         include: [{
   //             model: userStats,
   //         }]
        },
   //     { 
   //         model: userTable, as : 'friend',
   //     }
        ]

    });


    res.json(playerStats);
    console.log("Stats have been recieved");
    console.log(JSON.stringify(playerStats,null,2));

router.post("/", async (req,res) => { 
    const stats = req.body;
    await userStats.create(stats);
    res.json(stats);
})
})
module.exports = router; //in order to access this router in index.js