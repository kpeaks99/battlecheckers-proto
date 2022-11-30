//checkers.js
// First iteration 10-10-2022 Enrico Duller

const { response } = require('express');
const express = require('express');
const { request } = require('http');
const mysql = require('mysql');

import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Title from './pages/Title';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Tourney from './pages/Tourney';
import Profile from './pages/Profile';
import Battleboard from './pages/Battleboard';


// Establish connection with mysql DB
const db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'password',               
    //ensure auth use "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password' " command on mysql workbench queery
    database: 'battlececkers',
    port    : '3306'
});

//connect
db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log('MySQL connected . . .');
});

const app = express();

/*app.get('/', (req,res) => {              connection to the server will be met with login page (outputs the login.html file) 
    response.sendFile(path.join(__dirname + '/login.html'))
})*/

//authentication 
app.post('/auth', (request, response) => {
    // let username = request.body.username;
    //let password = request.body.password;                                     //passwords not implemented yet
    let sql = `SELECT * FROM player WHERE player_name = ${request.body.username}`;  // Query syntax including variable username
    if(username) {                                                              //Check for a valid username. No Nulls
        let query = db.query(sql, (err,result) => {                             //enter sql as query
            if (err) throw err;
            if (results.length > 0) {  
                request.session.loggin = true;
                request.session.username = username;
                response.redirect('/home');
            }else {
                response.send('Incorrect Credentials!');
            }
        response.end();
        });
    } else {
        response.send('Enter Username');
        response.end();
    }

});

//add entry into player (register new player)
/*app.get('/register', (req,res) => {
    let player = {}
});*/

// get all users 
app.get('/getusers', (req,res) => {
    let sql = 'SELECT * FROM player';                //sql syntax to get all items in player table
    let query = db.query(sql, (err,results)=> {      // passing sql syntax to be read as query input for the database
            if(err) throw err;                       // handling error
            console.log(results);                    //results will be outputted to console
            res.send('fetched all users')            //output to webpage
    })
});

//get a single user
app.get('/getuser/:id', (req,res) => {
    let sql = `SELECT * FROM player WHERE id  = ${req.params.id}`;               
    //sql syntax to get all items in player table backticks are used to enter variables
    let query = db.query(sql, (err,result)=> {      // passing sql syntax to be read as query input for the database
            if(err) throw err;                       // handling error
            console.log("Fetched user: \n"); 
            console.log(result);                    //results will be outputted to console
            res.send('fetched user')                             //output to webpage
    })
});


app.get('/getuserfriends/:player_name', (req,res) => {
    player_id = getUserId(req.params.player_name);
    let sql = `SELECT * FROM friends WHERE player_id  = ${player_id}`;               
    let query = db.query(sql, (err,result)=> {      // passing sql syntax to be read as query input for the database
           if(err) throw err;                       // handling error
           console.log("Fetched user: \n"); 
           console.log(result);                    //results will be outputted to console
           res.send('fetched user')                             //output to webpage
   })
});

app.listen('3000', () => {
    console.log('server started on port 3000')
});

