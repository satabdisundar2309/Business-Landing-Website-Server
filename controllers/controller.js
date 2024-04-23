require('dotenv').config();

// ! IMPORTING THE MODELS
const userModel = require('../models/userModel');
const contactModel = require('../models/contactModel')
const serviceModel = require('../models/serviceModel')

// ! IMPORTING BCRYPTJS MODULE
const bcrypt = require('bcryptjs')

// ! IMPORTING JWT MODULE
const jwt = require('jsonwebtoken')

// ! DEFINING DIFFERENT CONTROLLERS for USERS
const home = async (req, res)=>{
    try {
        res.status(200).send("Hello controller router")
    } catch (err) {
        console.log(err)
        res.status(400).send({message: "Page not found"})
    }
}

// register controller
const register = async (req, res)=>{
    try {
        const {username, email, phone, password} = req.body;

        const userExist = await userModel.findOne({email: email});
        if(userExist){
            res.status(400).json({
                message: "User Already Exists"
            })
        }
        else{
            // hashing the password
            const hashedPassword = await bcrypt.hash(password, 10)

            const data = new userModel({username, email, phone, password: hashedPassword});

            // generating jwt token
            const token = jwt.sign({
                userId: data._id.toString(),
                email: data.email,
                isAdmin: data.isAdmin
            },
            process.env.JWT_KEY, 
            {
                expiresIn: "30d"
            } )

            //saving in db
            const user = await data.save();

            //sending data
            res.status(200).send({
                message: "Registration Successful",
                token:token,
                userId: data._id.toString() 
            })
        }
        
    } catch (err) {
        console.log(err)
        res.status(400).send({message: "Could not register"});
    }
}


// login controller
const login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const userExist = await userModel.findOne({email: email});
        if(!userExist){
          return  res.status(400).json({
                message: "Invalid credentials"
            })
        }
        else{
            const isPasswordValid = await bcrypt.compare(password, userExist.password);
            if(isPasswordValid){
                 // generating jwt token
                const token = jwt.sign({
                        userId: userExist._id.toString(),
                        email: userExist.email,
                        isAdmin: userExist.isAdmin
                    },
                    process.env.JWT_KEY, 
                    {
                        expiresIn: "30d"
                    })

                res.status(200).send({
                    message: "Login Successful",
                    token:token,
                    userId: userExist._id.toString() 
                })
            }
            else{
                res.status(401).send({message: "Invalid email and password"});
            }
        }

    } catch (error) {
        console.log(err)
        res.status(400).send({message: "Could not login"});
    }
}


// contact controller
const contact = async (req, res)=>{
    try {
        const contactDetails = req.body;
        const data = new contactModel(contactDetails);
        const response = await data.save();
        return res.status(200).json({
            message: "Message sent successfully"
        })
    } catch (err) {
        // const error = {
        //     message: "Message not sent",
        //     status: 500,
        //     extraDetails: "Server Error"
        // }
        return res.status(500).json({
            message: "Message not delivered"
        })
    }
}

// get user data
const user = async (req, res)=>{
    try {
        const userData = req.user;
        console.log(userData)
        res.status(200).json({
            message:" Hello user",
            userData: userData
        })
    } catch (error) {
       console.log(`Error from the user route ${error}`) 
    }
}

const services = async (req, res)=>{
    try {
        const services = await serviceModel.find({});
        if(!services){
            res.status(404).json({
                message: "Servces fetch failure",
            })
        }
        res.status(200).json({
            message: "Servces fetched successfully",
            services: services
        })
    } catch (error) {
        console.log(`Services error: ${error}`)
    }
}
module.exports = {home, register, login, contact, user, services}