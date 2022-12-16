const {verify} = require('jsonwebtoken');

const validateToken = (req,res,next) => {
    const webToken = req.header("webToken");

    if (!webToken) return res.json({error: "User not logged in"});

    try{
        const validToken = verify(webToken, "secret")
        // creates an object containing the username and id
        req.user = validToken;  //user is a variable
       // console.log(req.user.id)
        if (validToken) {
            return next();
        }

    } catch (err) {
        return res.json({error: err});
    }

};

module.exports = {validateToken};