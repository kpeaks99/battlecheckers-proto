const express =require("express");
const router = express.Router();
const {models} = require("../models/index.js");

router.get("/", async (req,res)=>{ //Fetches all player stats
   // res.setHeader("Access-Control-Allow-Origin", "*")
    //res.setHeader("Access-Control-Allow-Credentials", "true");
   // res.setHeader("Access-Control-Max-Age", "1800");
   // res.setHeader("Access-Control-Allow-Headers", "content-type");
   // res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
   /* const playerStats = await userFriends.findAll(
    {   
        include: 
        [{
            where: {id: 1},
            model: userTable, as: 'player',
            include: [{
                model: userStat, as :'playerStat'
            }]
        },
        { 
            model: userTable, as : 'friend',
        }]

    });*/
    const playerStats = await userTable.findAll(
        {   where: {id: 1},
            attributes: ['name'],
            include: 
            [ {
                model: userStat, as :'playerStat'
            },
            {  
                model: userFriends, as :'player',
                include: 
                    [
                        {model: userTable, as: 'friend', attributes: ['name']}
                    ]
                
            }]
        }

        );


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