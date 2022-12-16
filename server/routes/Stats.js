const express =require("express");
const router = express.Router();
const cors = require("cors");
const {models} = require("../models/index.js");  //allows us to use the models for sequelize 

router.use(cors());// lets router use Cors

router.get("/", async (req,res)=>{ //Fetches all player stats
  
  const playerStats = await userTable.findAll(
        {   where: {id: 1},
            attributes: ['name'],
            include: 
            [ {
                model: userStat, as :'playerStat'
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

router.get("/leaderboard", async (req,res)=>{ //Fetches all player stats for leaderboard
    const leaderStats = await userStat.findAll(
        {   order: [['wins', 'DESC']],          //Starting from the top, highest Wins to the lowest wins
            include:
            [{
                model: userTable, as :'playerStat',
                attributes: ['name'],
            }]
        }

        );    
   
    res.json(leaderStats);
    console.log("Stats have been recieved for the leaderboard");
    console.log(JSON.stringify(leaderStats,null,2));


})
module.exports = router; //in order to access this router in index.js