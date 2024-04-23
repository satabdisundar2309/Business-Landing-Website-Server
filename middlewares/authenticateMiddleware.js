const jwt = require('jsonwebtoken')
require('dotenv').config()
const userModel = require('../models/userModel')

const authenticate = async (req, res, next)=>{
    let token = req.header("Authorization")
    if(!token){
        return res.status(401).json({
            message: "Invalid token/ expired token try again after logging in"
        })
    } 
    token = token.replace("Bearer","").trim()
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY)
        const userData = await userModel.findOne({email: decodedToken.email}).select({password: 0})
        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token/ expired token"
        })
    }
}

module.exports = {authenticate}