
const express=require('express');
const app=express();
const  cors=require("cors");
const connection = require('./server/server');
const userRouter = require('./routes/User.Routes');
const adminRouter = require('./routes/Admin.Route');
require('dotenv').config()

app.use(cors());
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("make my trip")
})
app.use('/users',userRouter)
app.use("/admin",adminRouter)
const port=process.env.PORT
app.listen(port,async(req,res)=>{
    try {
        await connection;
        console.log("connected to Database")
    } catch (error) {
        console.log("unable to connect to database");
        res.send(error)
    }
    console.log(`server is running on port ${port}`)
})

