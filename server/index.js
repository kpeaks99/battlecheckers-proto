const express = require('express');
const router = express.Router();
const app = express();
const cors = require("cors");   //allows us to self refrence our computer to be both host and client
const db = require('./models');


app.use(cors()); //actually using the middleware of Cors to automatically whitelist PC



//Routers
const statsRouter =require ("./routes/Stats");
app.use("/stats",statsRouter); // Enables post and get requests from the Posts route
const loginRouter =require ("./routes/user");
const { sequelize } = require('./models');
app.use("/user",loginRouter); 
app.use(express.json());

const PORT = process.env.PORT || 8080;                      
db.sequelize.sync().then(()=>{                            //connection to mysql database is in the config file under the config.json
    app.listen(PORT, () => {                              //After setting up sequelize for the database listen to PORT 
        console.log(`server started on port ${PORT}`)     //output to console the start of the server on PORT
    });
});