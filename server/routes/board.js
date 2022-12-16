const express =require("express");
const router = express.Router();
const {models, sequelize} = require("../models/index.js");
const {sign} = require('jsonwebtoken');
const {validateToken} = require('../middleware/Auth');

router.post("/end", async (req,res)=>{ 
    const {red, black, winner} = req.body;      //get data sent to this route
  const playerStats = await boardState.create(
        {   
            redUserId: red,     //id for red
            blackId: black,     // id for black
            redWon: winner,     //boolean for winner
        }

        );

    res.json(playerStats);
    console.log("Stats have been recieved");
    console.log(JSON.stringify(playerStats,null,2));


})

router.post("/updatestats", async (req,res) => { 
    const winnerId = req.body.winnerId;
    const winner = await userStats.findByPk(winnerId);
    await sequelize.transaction(async t =>{
        await winner.increment(['wins'])
    }) 
    const loserId = req.body.loserId;
    const loser = await userStats.findByPk(loserId);
    await sequelize.transaction(async t =>{
        await loser.increment(['losts'])
    })
    res.json(winner);
    res.json(loser);
})




module.exports = router; //in order to access this router in index.js