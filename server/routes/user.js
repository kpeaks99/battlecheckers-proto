const express =require("express");
const { DATE } = require("sequelize");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const models = require("../models/index.js");
const router = express.Router();
const {promisify} =require('util');
const { sequelize } = require("../models/index.js");

isLoggedIn = async (req,res,next) => {
    console.log(req.cookies);
    if(req.cookies.jwt){
        try{
            // verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            console.log(decoded);

            // check if the user still exists
            sequelize.query('SELECT * FROM userTable WHERE id = ?', [decoded.id], (error,result) => {
                console.log(result);

                if(!result) {
                    return next();
                }

                req.user = result[0]
                return next();

            });
        }catch(error){
            console.log(error);
            return next();
        }
    } else{
        next();
    }
   
}

logout = async (req,res,next) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() +  2*1000), 
        httpOnly: true
    });

    res.status(200).redirect('/')
}


    //registration
router.post("/login", async (req,res)=>  {
    const {email, password} = req.body;

    if(!email || !password){
      return res.status(400).render('login', {
        message: 'Please provide an email and password.'
      })
    }

   const [results] = await sequelize.query('SELECT * FROM userTable WHERE email = ?');
      console.log(results);
      if(!results || !(await bcrypt.compare(password, results[0].password))) {
          res.status(401).render('login', {
              message: 'Email or Password is incorrect'
          })
      } else{
          const id = results[0].id;

          const token = jwt.sign({ id:id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES_IN 
          });

          console.log("The token is: " + token);

          const cookieOptions = {
              expires: new Date(
                  Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ), 
              httpOnly: true
          }

          res.cookie('jwt', token, cookieOptions);
          res.status(200).redirect("/");
      }

    });


//reg    
router.post("/register", async (req,res) => {     
    console.log(req.body);

    const { name, email, password, confirmPassword } = req.body;

    //checks to see if email is in use and the user sets the right/correct password
    const [results] = await sequelize.query('SELECT email FROM userTable WHERE email = ?');
        if(error) {
            console.log(error);
        }

        if(results.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            })
        } else if(password !== confirmPassword) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        // hashes password so user passwords are hidden 
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        // Puts user information into database
        db.query('INSERT INTO userTable SET ?', {name: name, email: email, password: hashedPassword }, (error, results) => {
            if(error){
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'User reigstered'
                });
            }
        })

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