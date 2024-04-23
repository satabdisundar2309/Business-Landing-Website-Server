// ! REQUIRING EXPRESS
const express = require('express');
const app = express();

// ! IMPORTING CORS MIDDLEWARE
const cors = require('cors')
// const corsOption = {
//     origin: "http://localhost:5173",
//     methods: "GET, PUT, POST, UPDATE, PATCH, HEAD, DELETE",
//     credentials: true
// } 
app.use(cors())

// ! JSON MIDDLEWARE
app.use(express.json());

// ! REQUIRING DOTENV
require('dotenv').config();
const port = process.env.PORT || 8000

// ! REQUIRING DATABASE CONNECTION
const connectDB = require('./utils/dbConnection')

// !  REQUIRING ROUTES
const router = require('./routes/routes');
const router2 = require('./routes/adminRoutes');
app.use("/api/v1", router)
app.use("/api/v1/admin", router2)

// !REQUIRING AND USING MIDDLEWARE
const errorMiddleware = require('./middlewares/errorMiddleware');
app.use(errorMiddleware)

// ! DEFINING PORT TO LISTEN
connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`App is listening at port number ${port}`)
    })
})