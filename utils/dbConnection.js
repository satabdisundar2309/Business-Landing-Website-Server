require('dotenv').config();
const url = process.env.DB_URL

const mongoose = require('mongoose');
const connectDB = async ()=>{
    try {
        await mongoose.connect(url)
        console.log("DB Connection is successful")
    } catch (error) {
        console.log("DB connection is failed ", error)
        process.exit(0)
    } 
}

module.exports = connectDB;


