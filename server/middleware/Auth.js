
const {verify} = require('jsonwebtoken');

const validateToken = (req,res,next) => {
    const webToken = req.header("webToken");

    if (!webToken) return res.json({error: "User not logged in"});

    try{
        const validToken = verify(webToken, "secret")
        if (validToken) {
            return next();
        }

    } catch (err) {
        return res.json({error: err});
    }

};

module.exports = {validateToken};